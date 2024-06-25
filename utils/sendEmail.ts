
import { ContactInput } from './form.schema';

export async function sendEmail(data: ContactInput) {
    const response = await fetch(`/api/email`, {
        method: "POST",
        credentials: "include",
        cache: "no-cache",
        headers: {

            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;

}