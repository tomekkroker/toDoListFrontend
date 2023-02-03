const getExceptionMessage = async (ex: unknown): Promise<string> => {
  try {
    if (!(ex instanceof Response)) {
      return 'Wystąpił nierozpoznany błąd';
    }

    if (ex && ex.status === 0) {
      return 'Wystąpił błąd połączenia z serwerem';
    }

    if (ex && ex.json) {
      const { message, fieldErrors } = await ex.json();

      if (fieldErrors) {
        return 'Wprowadzone dane nie są prawidłowe';
      } if (message && `${message}`.toLowerCase() !== 'no message available') {
        return message;
      }
    }
  } catch (e) {
    console.error(e);
  }

  return 'Wystąpił nierozpoznany błąd';
};

// eslint-disable-next-line import/prefer-default-export
export { getExceptionMessage };
