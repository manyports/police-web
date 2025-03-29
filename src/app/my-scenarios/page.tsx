"use client";

import React from 'react';
import SavedScenarios from '../../components/SavedScenarios';
import { ScenarioProvider } from '../../contexts/ScenarioContext';
import { motion } from 'framer-motion';

export default function MyScenariosPage() {
  return (
    <ScenarioProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="bg-blue-50 py-6 sm:py-8 md:py-12 flex-grow">
          <div className="mx-auto w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Мои сценарии</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Управляйте своими созданными и сохраненными сценариями
                </p>
              </div>
              <SavedScenarios />
            </motion.div>
          </div>
        </div>
      </div>
    </ScenarioProvider>
  );
} 