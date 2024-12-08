import { useTaskStore } from '@store/useTaskStore';
import React from 'react';

const TareaView = () => {
  const { task } = useTaskStore()
  const { id } = task
  return (
    <div>
      tarea {id}
    </div>
  );
}

export default TareaView;
