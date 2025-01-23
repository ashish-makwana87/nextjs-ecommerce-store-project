import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function RatingInput({ name }: { name: string }) {
  const ratingArray = ["1", "2", "3", "4", "5"];

  return (
    <div className='mb-2 max-w-xs'>
      <Label htmlFor={name} className=' capitalize'>
        Rating
      </Label>
      <Select defaultValue='5' name={name} required>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ratingArray.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default RatingInput;
