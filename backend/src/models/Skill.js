const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      unique: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: [
        'Programming Languages',
        'Data Structures & Algorithms',
        'Frontend Development',
        'Backend Development',
        'Database & Storage',
        'DevOps & Cloud',
        'AI / Machine Learning',
        'Cybersecurity',
        'Core Computer Science',
        'Mobile Development',
        'Testing & QA',
      ],
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    icon: {
      type: String,
      default: 'Code',
    },
    proficiencyLevels: {
      type: [String],
      default: ['Beginner', 'Intermediate', 'Advanced'],
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

skillSchema.index({ category: 1, name: 1 });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
