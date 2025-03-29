"use client";

import React from 'react';
import ScenarioEditor from '../../components/ScenarioEditor';
import { ScenarioProvider } from '../../contexts/ScenarioContext';
import { motion } from 'framer-motion';
export default function ScenarioEditorPage() {
  return (
    <ScenarioProvider>
      <div className="min-h-screen bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto py-8">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-center">Конструктор сценариев</motion.h1>
          <ScenarioEditor />
        </motion.div>
      </div>
    </ScenarioProvider>
  );
} 