export const handleChangeTitle = ({ target: { value } }) => {
  const splitValue = value.split("");
  const title = value[0]
    ? value[0].toUpperCase() + splitValue.slice(1).join("")
    : [];
  setTitle(title);
};
