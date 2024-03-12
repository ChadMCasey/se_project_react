import { formValidationConfig } from "../../utils/constants";
import FormValidator from "../../scripts/components/formValidator";
const forms = Array.from(document.getElementsByTagName("form"));

forms.forEach((form) => {
  const formObj = new FormValidator(formValidationConfig, form);
  formObj.enableValidation();
});
