import { reactive } from "vue";
import { sortBy, pick } from "lodash";
import local from "./local";

const state = reactive({
  channels: {},
  categories: {},
  videos: {},
  unknown: {},
});

const intercepted = [];

const processZObject = (data) => {
  const { zobject_type_title } = data;
  if (zobject_type_title === "channel") {
    const attrs = [
      "_id",
      "avatar",
      "bio",
      "friendly_title",
      "title",
      "video_ids",
    ];
    const channel = (state.channels[data._id] = pick(data, attrs));
    local.setChannel(channel);
  } else {
    // markUnknown(resource, { response, url })
  }
};

const processVideo = (data) => {
  const attrs = [
    "_id",
    "description",
    "duration",
    "friendly_title",
    "title",
    "short_description",
    "published_at",
  ];
  state.videos[data._id] = pick(data, attrs);
  console.log(data.friendly_title);
};

const markUnknown = (key, item) => {
  state.unknown[key] = state.unknown[key] || [];
  state.unknown[key].push(item);
};

const interceptXHR = (window.__NW.interceptXHR = ({ response, url }) => {
  intercepted.push({ response, url });
  const [path, _query_string] = url.split("?");
  const resource = path.split("/").pop();
  if (resource === "categories") {
    response.forEach(({ friendly_title, title, values }) => {
      if (!state.categories[friendly_title]) {
        state.categories[friendly_title] = { friendly_title, title, values };
      } else {
        values.forEach((v) => {
          if (!state.categories[friendly_title].values.includes(v)) {
            console.warn(
              "missing value",
              v,
              state.categories[friendly_title].values.slice()
            );
          }
        });
      }
    });
  } else if (resource === "videos") {
    response.forEach(processVideo);
  } else if (resource === "zobjects") {
    response.forEach(processZObject);
  } else {
    markUnknown(resource, { response, url });
  }
});

window.__NW.xhr_backlog.forEach(interceptXHR);
export default {
  state,
  listChannels: () => sortBy(Object.values(state.channels), "title"),
  listCategories: () => sortBy(Object.values(state.categories), "title"),
  listVideos: () => sortBy(Object.values(state.videos), "title"),
};
