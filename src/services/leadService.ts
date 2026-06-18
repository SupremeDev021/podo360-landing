export type LeadPayload = {
  name: string;
  clinicName: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  source: string;
};

export async function submitLead(payload: LeadPayload) {
  const endpoint = import.meta.env.VITE_LEAD_CAPTURE_ENDPOINT as string | undefined;

  if (!endpoint) {
    return {
      ok: true,
      offline: true
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error("lead_submission_failed");
  }

  return {
    ok: true,
    offline: false
  };
}
