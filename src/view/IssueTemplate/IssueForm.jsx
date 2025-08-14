import { useForm } from 'react-hook-form';
import React from 'react';
import VisionIssueModel from "../../model/VisionIssueModel";

const IssueFormInput = ({
  register,
  errors,
  name,
  type = 'text',
  required = false,
  label,
  multiline = false,
  rows = 3,
}) => {
  return (
    <div className="flex flex-col rounded-lg bg-gray-100 p-4 shadow-md">
      <label className="mb-1">{label}</label>
      {multiline ? (
        <textarea
          className="rounded border p-2 resize-y"
          rows={rows}
          {...register(
            name,
            required ? { required: `${label} is required` } : {}
          )}
        />
      ) : (
        <input
          className="rounded border p-2"
          {...register(
            name,
            required ? { required: `${label} is required` } : {}
          )}
          type={type}
        />
      )}
      {errors[name] && (
        <p className="text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

const IssueForm = ({ issue, setIssue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newIssue = new VisionIssueModel({
      lotId: data['Lot Id'],
      start_time: data['Start Time'],
      end_time: data['End Time'],
      hmi_alarm_name: data['hmi_alarm_name'],
      equipment: data['equipment'],
      issue: data['Issue'],
      issue_location: 'Location A', // Placeholder, can be modified
      issue_reason: 'Reason for the issue', // Placeholder, can be modified
      solution: data['solution']

    });
    setIssue(newIssue);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      <IssueFormInput
        register={register}
        errors={errors}
        name="Alarm name"
        label={"Alarm Name"}
      />
      <IssueFormInput
        register={register}
        errors={errors}
        name="Lot Id"
        label={"Lot ID"}
      />
      <IssueFormInput
        register={register}
        errors={errors}
        name="Start Time"
        type="datetime-local"
        required={true}
        label={"Start Time"}
      />
      <IssueFormInput
        register={register}
        errors={errors}
        name="End Time"
        type="datetime-local"
        required={true}
        label={"End Time"}
      />
      <IssueFormInput
        register={register}
        errors={errors}
        name="Issue"
        required={true}
        label={"Issue"}
        multiline={true}
        rows={4}
      />
      <input type="submit" onSubmit={handleSubmit(onSubmit)} />
    </form>
  );
};

export default IssueForm;