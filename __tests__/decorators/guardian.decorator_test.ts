import { assertEquals, assertThrows } from "@std/assert";
import {
  Email,
  IsArray,
  IsString,
  Max,
  Min,
  MinLength,
  NotBlank,
  TitleCase,
} from "../../src/decorators/guardian.decorator.ts";
import {
  NotValidEmailError,
  TypeNotMatchError,
} from "../../src/errors/valid.error.ts";
import {
  UndefinedValueError,
  ValueError,
  ValueLengthError,
} from "../../src/errors/value.error.ts";
import type { Mixed } from "../../src/types/value.type.ts";

Deno.test("IsString accepts a valid string and rejects everything else", () => {
  class Sample {
    @IsString()
    name: string = "guardian";
  }
  assertEquals(new Sample().name, "guardian");

  assertThrows(() => {
    class Bad {
      @IsString()
      name: Mixed = 42;
    }
    new Bad();
  }, TypeNotMatchError);
});

Deno.test("IsString rejects undefined", () => {
  assertThrows(() => {
    class Bad {
      @IsString()
      name: Mixed = undefined;
    }
    new Bad();
  }, UndefinedValueError);
});

Deno.test("IsArray now rejects non-array values (regression: previously logged an error but let the value through unchanged)", () => {
  assertThrows(() => {
    class Bad {
      @IsArray()
      tags: Mixed = "not-an-array";
    }
    new Bad();
  }, TypeNotMatchError);
});

Deno.test("Min returns the validated value (regression: previously had no return statement, so the field silently became undefined even on success)", () => {
  class Sample {
    @Min(0)
    amount: number = 10;
  }
  assertEquals(new Sample().amount, 10);
});

Deno.test("Max returns the validated value and rejects out-of-range numbers", () => {
  class Sample {
    @Max(100)
    amount: number = 50;
  }
  assertEquals(new Sample().amount, 50);

  assertThrows(() => {
    class Bad {
      @Max(100)
      amount: number = 999;
    }
    new Bad();
  }, ValueError);
});

Deno.test("MinLength rejects strings shorter than the limit", () => {
  assertThrows(() => {
    class Bad {
      @MinLength(5)
      username: string = "ab";
    }
    new Bad();
  }, ValueLengthError);
});

Deno.test("Email validates format and rejects blacklisted domains", () => {
  class Sample {
    @Email()
    address: string = "person@example.com";
  }
  assertEquals(new Sample().address, "person@example.com");

  assertThrows(() => {
    class Bad {
      @Email({ domainBlackList: ["spam.com"] })
      address: string = "person@spam.com";
    }
    new Bad();
  }, NotValidEmailError);
});

Deno.test("NotBlank rejects whitespace-only strings", () => {
  assertThrows(() => {
    class Bad {
      @NotBlank()
      note: string = "   ";
    }
    new Bad();
  }, ValueLengthError);
});

Deno.test("TitleCase transforms the value", () => {
  class Sample {
    @TitleCase("en-US")
    title: string = "the guardian package";
  }
  assertEquals(new Sample().title, "The Guardian Package");
});
