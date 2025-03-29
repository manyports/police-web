"use client";

import React from 'react';
import SavedScenarios from '../../components/SavedScenarios';
import { ScenarioProvider } from '../../contexts/ScenarioContext';
import { motion } from 'framer-motion';
export default function MyScenariosPage() {
  return (
    <ScenarioProvider>
      <div className="min-h-screen bg-gray-50">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="container mx-auto py-8">
          <SavedScenarios />
        </motion.div>
      </div>
    </ScenarioProvider>
  );
} 