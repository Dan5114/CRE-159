export const findCardByStep = (instruction_content, step) => {
  if (!Array.isArray(instruction_content) || instruction_content.length === 0) {
    console.warn('Invalid or empty instruction_content array.');
    return null;
  }

  if (!Number.isFinite(step)) {
    console.warn('Invalid step parameter. It must be a finite number.');
    return null;
  }

  const card = instruction_content.find(({ steps }) => {
    if (typeof steps !== 'string') return false;
    const stepNumber = parseInt(steps.replace(/\D+/g, ''), 10);
    return stepNumber === step;
  });

  if (!card) {
    console.warn(`No card found for Step ${step}.`);
  }

  return card ?? null;
  };
  