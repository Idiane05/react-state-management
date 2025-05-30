type Task = { 
  id: number; 
  text: string; 
  completed: boolean 
};

type State = Task[];

type Action =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: number }
  | { type: "toggle"; payload: number };

export function taskReducer(state: State, action: Action): State {
  switch (action.type) {
    case "add":
      return [...state, { 
        id: Date.now(), 
        text: action.payload,
        completed: false 
      }];
    case "remove":
      return state.filter(task => task.id !== action.payload);
    case "toggle":
      return state.map(task => 
        task.id === action.payload 
          ? { ...task, completed: !task.completed } 
          : task
      );
    default:
      return state;
  }
}