// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import { useState, Fragment, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";

interface StopDetails {
  id: string;
  name: string;
}

interface SearchDestinationProps {
  setDestination: (arg: string) => void;
}

export default function SearchDestination({
  setDestination,
}: SearchDestinationProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<StopDetails[]>([]);
  const [value, setValue] = useState<any>();
  const loading = open && options.length === 0;

  const onChangeHandle = async (value: string) => {
    // use the changed value to make request and then use the result. Which
    if (value !== "") {
      const response = await axios.get(
        `https://v5.db.transport.rest/locations?query=${value}&results=5`
      );
      const stops = await response.data;
      const filteredStops = Object.keys(stops).map(key => {
        return { id: stops[key]["id"], name: stops[key]["name"] };
      });
      setOptions(filteredStops);
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      <label
        htmlFor="destination"
        style={{ color: "black", fontWeight: 600, fontSize: 20 }}
      >
        Destination
      </label>
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option?.name === value?.name}
        getOptionLabel={option => option?.name ?? ""}
        options={options}
        loading={loading}
        filterOptions={x => x}
        onChange={(event: any, newValue: StopDetails | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          setDestination(newValue ? newValue.id : "");
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            name="origin"
            onChange={ev => {
              if (ev.target.value !== "" || ev.target.value !== null) {
                onChangeHandle(ev.target.value);
              }
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
