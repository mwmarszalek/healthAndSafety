import { UserInput } from '../App'; // Import the UserInput interface from App.tsx

const violationsList: UserInput[] = [];

export const addViolation = (userInput: UserInput) => {
  violationsList.push(userInput);
};

export const getViolationsList = () => {
  return violationsList;
};