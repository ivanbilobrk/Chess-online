 export default function ErrorInput(count, validation, focus) {
    if (count === false) return false;

    if (!focus) {
      return !validation;
    }
    return false;
  };

export {ErrorInput};