
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { reorderSections, setDragging, addSection } from '../lib/redux/slices/portfolioSlice';
import EditorHeader from '../components/editor/EditorHeader';
import SectionsList from '../components/editor/SectionsList';
import PortfolioCanvas from '../components/editor/PortfolioCanvas';
import { useToast } from '../hooks/use-toast';
import { SECTION_TEMPLATES } from '../components/editor/SectionsList';

const Editor = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const handleDragStart = () => {
    dispatch(setDragging(true));
  };
  
  const handleDragEnd = (result) => {
    dispatch(setDragging(false));
    
    const { source, destination, draggableId } = result;
    
    // If dropped outside a droppable area
    if (!destination) {
      return;
    }
    
    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // If dragging from sections list to canvas
    if (
      source.droppableId === 'sections-list' &&
      destination.droppableId === 'portfolio-canvas'
    ) {
      // Extract the template type from the draggableId
      const templateId = draggableId;
      const templateMatch = templateId.match(/^([a-z-]+)-template$/);
      
      if (templateMatch && templateMatch[1]) {
        const sectionType = templateMatch[1];
        
        // Find the template from the SectionsList using the imported array
        const template = SECTION_TEMPLATES.find(t => t.id === templateId);
        
        if (template) {
          // Create a new section based on the template
          const newSection = {
            id: `${template.type}-${Date.now()}`,
            type: template.type,
            ...template.template,
          };
          
          // Add the new section to the portfolio
          dispatch(addSection(newSection));
          
          toast({
            title: `${template.title} section added`,
            description: "Section has been added to your portfolio",
          });
        }
      }
      return;
    }
    
    // If reordering within the canvas
    if (
      source.droppableId === 'portfolio-canvas' &&
      destination.droppableId === 'portfolio-canvas'
    ) {
      dispatch(reorderSections({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }));
      
      toast({
        title: "Section reordered",
        description: "The section has been moved to a new position",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <EditorHeader />
      
      <DragDropContext 
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex flex-col lg:flex-row">
          <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white overflow-y-auto">
            <SectionsList />
          </div>
          
          <PortfolioCanvas />
        </div>
      </DragDropContext>
    </div>
  );
};

export default Editor;