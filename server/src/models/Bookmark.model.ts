import mongoose, { Document, Schema } from 'mongoose';

export interface IBookmark extends Document {
  userId: mongoose.Types.ObjectId;
  itemType: 'Resource' | 'Roadmap' | 'Placement' | 'Hackathon';
  itemId: mongoose.Types.ObjectId;
  folderName?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    itemType: {
      type: String,
      enum: ['Resource', 'Roadmap', 'Placement', 'Hackathon'],
      required: true,
      index: true,
    },
    itemId: { type: Schema.Types.ObjectId, required: true, index: true },
    folderName: { type: String, default: 'General' },
    notes: { type: String },
  },
  {
    timestamps: true,
  }
);

BookmarkSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });

export const Bookmark = mongoose.model<IBookmark>('Bookmark', BookmarkSchema);
