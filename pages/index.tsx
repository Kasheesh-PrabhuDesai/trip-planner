import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PlanTripPage from "./plan-trip";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/plan-trip");
  });
  return <></>;
}
