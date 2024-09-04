import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FilterType } from "../../redux/users_reducer";
import Select from "react-select";
import classes from "./Users.module.css";

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

const options = [
  {
    value: null,
    label: "All",
  },
  {
    value: true,
    label: "Only followed",
  },
  {
    value: false,
    label: "Only unfollowed",
  },
];

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const { register, handleSubmit, control, clearErrors } = useForm<FilterType>({
    mode: "onChange",
  });

  const onSubmit = handleSubmit((formData) => {
    clearErrors()
    props.onFilterChanged(formData);
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="text" {...register("term")} />
          <Controller
            control={control}
            name="friend"
            render={({ field: { onChange } }) => (
              <div>
              <Select
                className={classes.userSelect}
                options={options}
                onChange={(v) => onChange(v?.value)}
              />
               </div>
            )}
          />
          <button type="submit">Find</button>
        </div>
      </form>
    </div>
  );
});

export default UsersSearchForm;
