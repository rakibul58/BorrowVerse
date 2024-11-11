/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err: any): IGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const status = 400;

  return {
    success: false,
    status,
    message: `${extractedMessage} is already exists`,
  };
};

export default handleDuplicateError;
