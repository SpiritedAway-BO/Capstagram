const createCloudWidget = (cb) => {
  return cloudinary.createUploadWidget(
    {
      cloudName: 'cwhrcloud',
      uploadPreset: 'ml_default',
    },
    (err, res) => {
      if (!err && res && res.event === 'success') {
        cb(res.info.secure_url);
      }
    }
  );
};

module.exports.createCloudinaryWidget = createCloudinaryWidget;