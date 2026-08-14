const handleNextQuestion = () => {
    if (currentQIndex < currentTopic.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      // scoreCount already includes the final question from handleAnswerSubmit
      const scorePct = Math.round((scoreCount / currentTopic.questions.length) * 100);
      const passed = scorePct >= PASSING_MASTERY_SCORE;

      setTopicProgress(prev => ({
        ...prev,
        [activeTopicIndex]: { score: scorePct, passed }
      }));

      if (passed && activeTopicIndex + 1 < TOPICS.length) {
        setUnlockedTopics(prev => Array.from(new Set([...prev, activeTopicIndex + 1])));
      }

      if (passed) {
        setView('dashboard');
      } else {
        setView('tutorial');
      }
    }
  };
