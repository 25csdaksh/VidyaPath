import mongoose, { Document, Schema } from 'mongoose';

export interface IRoadmapMilestone {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: string[];
  recommendedResources: {
    title: string;
    url: string;
    type: string;
  }[];
}

export interface IRoadmap extends Document {
  title: string;
  slug: string;
  description: string;
  domain: string;
  iconName: string;
  difficulty: string;
  estimatedWeeks: number;
  milestones: IRoadmapMilestone[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoadmapSchema = new Schema<IRoadmap>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, required: true },
    domain: { type: String, required: true, index: true },
    iconName: { type: String, default: 'Compass' },
    difficulty: { type: String, default: 'Beginner to Advanced' },
    estimatedWeeks: { type: Number, default: 12 },
    milestones: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String },
        order: { type: Number, required: true },
        topics: [{ type: String }],
        recommendedResources: [
          {
            title: { type: String },
            url: { type: String },
            type: { type: String },
          },
        ],
      },
    ],
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Roadmap = mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
