import { useState } from "react";

const validacao = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    mensagem: "Preencha um email válido",
  },
};

const useForm = (type) => {
  const [value, setValue] = useState("");
  const [erro, setErro] = useState(null);

  function validate(value) {
    if (type === false) return true;

    if (value.length === 0) {
      setErro("Preencha um valor");
      return false;
    } else if (validacao[type] && !validacao[type].regex.test(value)) {
      setErro(validacao[type].mensagem);
      return false;
    } else {
      setErro(null);
      return true;
    }
  }

  function onChange({ target }) {
    if (erro) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    erro,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;