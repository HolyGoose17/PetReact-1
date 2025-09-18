import { useForm } from "react-hook-form";
import { Button } from "../../components/Buttons/Buttons";
import { DTO } from "../../components/DTO";
import { TextInput } from "../../components/fields/TextInput/TextInput";
import { FileInput } from "../../components/fields/FileInput";
import { CustomSelect } from "../../components/CustomSelect/CustomSelect";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const PlayerFormCard = (props) => {
  const {
    closeForm = () => {},
    handleSave = () => {},
    selected = null,
    clubs = [],
    agents = [],
    roles = [],
  } = props;

  const { getValues, control, reset } = useForm({
    defaultValues: {
      playerName: "",
      playerAge: "",
      playerNational: "",
      playerFoot: "",
      playerSalary: "",
      roleName: "",
      agentName: "",
      clubName: "",
      path: "",
      pathClub: "",
    },
  });

  useEffect(() => {
    if (selected) {
      reset({
        ...selected,
        roleName: selected.roleName?.roleID || selected.roleName || "",
        agentName: selected.agentName?.agentID || selected.agentName || "",
        clubName: selected.clubName?.clubID || selected.clubName || "",
        path: "",
        pathClub: "",
      });
    } else {
      reset({
        playerName: "",
        playerAge: "",
        playerNational: "",
        playerFoot: "",
        playerSalary: "",
        roleName: "",
        agentName: "",
        clubName: "",
        path: "",
        pathClub: "",
      });
    }
  }, [selected, reset]);

  const getDefaultValues = () => {
    if (!selected) return { path: "" };

    return {
      ...selected,
      roleName: selected.roleName?.roleID || selected.roleName || "",
      agentName: selected.agentName?.agentID || selected.agentName || "",
      clubName: selected.clubName?.clubID || selected.clubName || "",
      path: "",
    };
  };

  const { isPending: isRolePending, data: roleList = [] } = useQuery({
    //isPending: isRolePending, dataRoles: roleList
    queryKey: ["roleList"],
    queryFn: () =>
      fetch("http://localhost:3005/role", {}).then((res) => res.json()),
  });

  const { isPending: isAgentPending, data: agentList = [] } = useQuery({
    // isPending: isAgentPending, data: agentList
    queryKey: ["agentList"],
    queryFn: () =>
      fetch("http://localhost:3005/agents", {}).then((res) => res.json()),
  });

  const { isPending: isClubPending, data: clubList = [] } = useQuery({
    //isPending: isClubPending, data: clubList
    queryKey: ["clubList"],
    queryFn: () =>
      fetch("http://localhost:3005/club", {}).then((res) => res.json()),
  });

  const isPending = isRolePending || isAgentPending || isClubPending;

  const onSubmit = () => {
    const formData = getValues();
    console.log("path is File:", formData.path instanceof File);
    console.log("path value:", formData.path);

    const dataToSave = {
      playerName: formData.playerName,
      playerAge: parseInt(formData.playerAge) || 0,
      playerNational: formData.playerNational,
      playerFoot: formData.playerFoot,
      playerSalary: parseFloat(formData.playerSalary) || 0,
      // если сломается замени на roleNameRoleID и т.д.
      roleName: formData.roleName ? parseInt(formData.roleName) : null,
      agentName: formData.agentName ? parseInt(formData.agentName) : null,
      clubName: formData.clubName ? parseInt(formData.clubName) : null,

      path: formData.path ? extractFileName(formData.path) : null,
      pathClub: formData.pathClub ? extractFileName(formData.pathClub) : null,
    };

    handleSave(dataToSave);
  };
  const extractFileName = (fullPath) => {
    if (!fullPath) return null;
    if (typeof fullPath === "string" && fullPath.includes("img/"))
      return fullPath;
    if (fullPath instanceof File) return `img/${fullPath.name}`;
    const fileName = fullPath.split("\\").pop().split("/").pop();
    return `img/${fileName}`;
  };
  return (
    <div className="player-form-popUp">
      <div className="player-form-wrapper" onClick={closeForm}></div>
      <div className="player-form-card">
        <h3>{selected ? "Редактирование игрока" : "Добавление игрока"}</h3>

        <DTO
          name="roleName"
          label="Роль"
          control={control}
          data={roles} //!isPending && roleList.length && roleList ? roleList : []
          labelKey="roleName"
          valueKey="roleID"
          // onChange={(e) => {
          //   // setValue(
          //   //   "roleID",
          //   //   roleList.find((item) => item.roleName === e.target.value)?.roleID
          //   // );
          //   setValue("roleID", e.target.value);
          // }}
          component={CustomSelect}
        />

        <DTO
          name="agentName"
          label="Агент"
          control={control}
          data={agents} //!isPending && agentList.length && agentList ? agentList : []
          labelKey="agentName"
          valueKey="agentID"
          // onChange={(e) => {
          //   // setValue(
          //   //   "agentID",
          //   //   agentList.find((item) => item.agentName === e.target.value)
          //   //     ?.agentID
          //   // );
          //   setValue("agentID", e.target.value);
          // }}
          component={CustomSelect}
        />

        <DTO
          name="clubName"
          label="Клуб"
          control={control}
          data={clubs} //!isPending && clubList.length && clubList ? clubList : []
          labelKey="clubName"
          valueKey="clubID"
          // onChange={(e) => {
          //   // setValue(
          //   //   "clubID",
          //   //   clubList.find((item) => item.clubName === e.target.value)?.clubID
          //   // );
          //   setValue("clubID", e.target.value);
          // }}
          component={CustomSelect}
        />

        <DTO
          name="playerName"
          label="Имя игрока"
          control={control}
          component={TextInput}
        />

        <DTO
          name="playerAge"
          label="Возраст"
          control={control}
          component={TextInput}
        />

        <DTO
          name="playerNational"
          label="Национальность"
          control={control}
          component={TextInput}
        />

        <DTO
          name="playerFoot"
          label="Рабочая нога"
          control={control}
          component={TextInput}
        />

        <DTO
          name="playerSalary"
          label="Зарплата"
          control={control}
          component={TextInput}
        />

        <DTO
          type="file"
          name="path"
          label="Фото игрока"
          control={control}
          component={FileInput}
        />

        <DTO
          type="file"
          name="pathClub"
          label="Логотип клуба"
          control={control}
          component={FileInput}
        />

        <div className="player-form-card-control">
          <Button label="Отмена" callback={closeForm} />
          <Button
            variant="add"
            label={selected ? "Обновить" : "Добавить"}
            callback={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};
