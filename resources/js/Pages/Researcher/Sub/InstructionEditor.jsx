import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

// Simple Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500">Failed to load instruction editor.</div>;
    }

    return this.props.children;
  }
}

const InstructionEditor = ({ instruction_content, step }) => {
  const [content, setContent] = useState(null);
  const [Editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        setLoading(true);
        const [{ findCardByStep }, JoditEditor] = await Promise.all([
          import('./findCardByStep'),
          import('jodit-react').then((mod) => mod.default),
        ]);

        const card = findCardByStep(instruction_content, step);
        setContent(card?.content || `No Instruction for Step ${step}`);
        setEditor(() => JoditEditor);
      } catch (error) {
        console.error('Failed to load instruction or editor:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [instruction_content, step]);

  if (loading || !Editor) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-500 italic h-3">
        <Loader2 className="animate-spin size-5 text-primary" />
        Loading instruction...
      </div>
    );
  }

  const JoditEditor = Editor;

  return (
    <ErrorBoundary>
      <div className="mb-4">
        <JoditEditor
          value={content}
          config={{
            height: 300,
            resizable: false,
            allowResizeX: false,
            allowResizeY: false,
            toolbarSticky: false,
            readonly: true,
            buttons: ['print'],
            toolbarAdaptive: false,
          }}
        />
      </div>
    </ErrorBoundary>
  );
};

export default InstructionEditor;
