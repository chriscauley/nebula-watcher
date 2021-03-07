import { reactive } from "vue";
import { defaults } from "lodash";
import ls from "local-storage-json";

const LS_KEY = "store/local";
const SLUG_CHANNELS = {};

const state = reactive({
  channels: {},
  videos: {},
  subscriptions: {}, // TODO should be in user settings
  ...ls.get(LS_KEY),
});

const commit = () => ls.set(LS_KEY, state);

const setChannel = ({ _id, title }) => {
  if (!state.channels[_id]) {
    // TOOD internal log system
    console.log("saving new channel", title); // eslint-disable-line
  }

  const channel = (state.channels[_id] = defaults(
    {
      _id,
      title,
      video_ids: [],
      slug: title.toLowerCase().replace(/ /g, "-"),
    },
    state.channels[_id]
  ));
  SLUG_CHANNELS[channel.slug] = channel;
  commit();
};

const setVideo = (video, channel_id) => {
  if (state.videos[video._id]?.channel !== channel_id) {
    // TODO internal logging system
    console.log("assigning video to channel", video.title); // eslint-disable-line
    if (state.videos[video._id]) {
      const old_channel = state.channels[state.videos[video._id].channel_id];
      old_channel.video_ids = old_channel.video_ids.filter(
        ({ _id }) => _id !== video._id
      );
    }
    state.channels[channel_id].video_ids.push(video._id);
    state.videos[video._id] = {
      _id: video.id,
      title: video.title,
      channel_id,
    };
    commit();
  }
};

const getChannelFromSlug = (slug) => SLUG_CHANNELS[slug];

const toggleFollowChannel = ({ _id }) => {
  const channel = state.channels[_id]
  channel.following = !channel.following
  commit()
}

const isFollowingChannel = ({ _id }) => state.channels[_id]?.following

export default {
  state,
  getChannelFromSlug,
  isFollowingChannel,
  setChannel,
  setVideo,
  toggleFollowChannel,
};
