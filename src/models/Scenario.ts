import mongoose from 'mongoose';
import { ScenarioData, Scene, AnswerOption } from '@/types/scenario';

const AnswerOptionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  explanation: { type: String, required: true }
});

const SceneSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  options: [AnswerOptionSchema]
});

const ScenarioSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  previewImageUrl: { type: String, default: '' },
  scenes: [SceneSchema],
  isPublic: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ScenarioSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

ScenarioSchema.methods.toScenarioData = function(): ScenarioData {
  return {
    id: this.id,
    title: this.title,
    description: this.description,
    previewImageUrl: this.previewImageUrl,
    scenes: this.scenes,
    userId: this.userId.toString()
  };
};

const Scenario = mongoose.models.Scenario || mongoose.model('Scenario', ScenarioSchema);

export default Scenario; 