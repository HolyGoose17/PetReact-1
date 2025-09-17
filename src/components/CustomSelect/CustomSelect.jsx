// export const CustomSelect = ({
//   data = [],
//   label = "",
//   placeholder = "",
//   labelKey = "name",
//   valueKey = "id",
//   ...props
// }) => {
//   return (
//     <div>
//       <span>{label}: </span>
//       <select {...props} placeholder={placeholder}>
//         <option value="">Возможные варианты</option>
//         {data.map((item) => (
//           <option key={item[valueKey]} value={item[valueKey]}>
//             {item[labelKey]}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

export const CustomSelect = ({
  data = [],
  label = "",
  placeholder = "",
  labelKey = "name",
  valueKey = "ID",
  ...props
}) => {
  return (
    <div>
      <span>{label}: </span>
      <select {...props} placeholder={placeholder}>
        <option value="">Возможные варианты</option>
        {data.map((item) => (
          <option key={item[valueKey]} value={item[valueKey]}>
            {item[labelKey]}
          </option>
        ))}
      </select>
    </div>
  );
};
