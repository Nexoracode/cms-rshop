export function validateHeroSlider(data: any, showButtonFields: boolean) {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "لطفاً عنوان اسلایدر را وارد کنید.";
  }

  if (!data.description || data.description.trim() === "") {
    errors.description = "لطفاً توضیحات اسلایدر را وارد کنید.";
  }

  if (showButtonFields) {
    if (!data.button_text || data.button_text.trim() === "") {
      errors.button_text = "لطفاً عنوان دکمه را وارد کنید.";
    }
    if (!data.button_link || data.button_link.trim() === "") {
      errors.button_link = "لطفاً لینک دکمه را وارد کنید.";
    }
  }

  return errors;
}