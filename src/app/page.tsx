import { CTA } from '@/components/CTA';
import { DateTimePicker } from '@/components/DateTimePicker';
import { InputFile } from '@/components/InputFile';
import { Slider } from '@/components/Slider';
import { TextField } from '@/components/Textfield';

export default function Home() {
  return (
    <div className="container flex flex-col">
      <h1 className="pb-[32px] text-2xl leading-none font-medium">Personal info</h1>
      <div className="flex flex-col gap-[24px] pb-[48px]">
        <TextField label="First Name" />
        <TextField label="Last Name" />
        <TextField label="Email Address" type="email" error />
        <Slider />
        <InputFile />
      </div>
      <h1 className="pb-[32px] text-2xl leading-none font-medium">Your workout</h1>

      <DateTimePicker />

      <div className="pt-[32px]">
        <CTA />
      </div>
    </div>
  );
}
