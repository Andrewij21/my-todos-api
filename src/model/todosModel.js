const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdDate",
      updatedAt: "updateDate",
    },
  }
);

module.exports = model("todo", schema);
