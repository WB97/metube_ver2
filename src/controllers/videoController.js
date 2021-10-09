import Video from "../models/Video.js";
import User from "../models/User.js";

export const homepageVideos = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await (await Video.findById(id)).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("videos/watch", {
    pageTitle: video.title,
    video,
  });
};

export const getUpload = (req, res) => {
  return res.render("videos/upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    file,
    body: { title, description, hashtags },
    session: {
      user: { _id },
    },
  } = req;
  try {
    const newVideo = await Video.create({
      fileUrl: file.path,
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      owner: _id,
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("videos/upload", {
      pageTitle: "Upload",
      errorMessage: error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const aa = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("videos/edit", {
    pageTitle: `Editing ${video.title}`,
    video,
  });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.exists({ _id: id });
  const _video = await Video.findById(id);
  const { title, description, hashtags } = req.body;
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(_video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const remove = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const _video = await Video.findById(id);
  if (String(_video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search Video", videos });
};
