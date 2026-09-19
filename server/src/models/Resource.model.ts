import mongoose, { Document, Schema } from 'mongoose';
import { ResourceCategory, ResourceType, DifficultyLevel } from '../constants';

export interface IResource extends Document {
  title: string;
  slug: string;
  type: ResourceType;
  category: ResourceCategory;
  difficulty: DifficultyLevel;
  url: string;
  description: string;
  tags: string[];
  thumbnailUrl?: string;
  provider?: string;
  estimatedHours?: number;
  rating: number;
  votesCount: number;
  createdBy?: mongoose.Types.ObjectId;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: { type: String, enum: Object.values(ResourceType), required: true, index: true },
    category: { type: String, enum: Object.values(ResourceCategory), required: true, index: true },
    difficulty: { type: String, enum: Object.values(DifficultyLevel), default: DifficultyLevel.BEGINNER, index: true },
    url: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true, index: true }],
    thumbnailUrl: { type: String },
    provider: { type: String, trim: true },
    estimatedHours: { type: Number },
    rating: { type: Number, default: 4.8, min: 1, max: 5 },
    votesCount: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    isApproved: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

ResourceSchema.index({ type: 1, category: 1, difficulty: 1 });
ResourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

export const Resource = mongoose.model<IResource>('Resource', ResourceSchema);
