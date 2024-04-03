"use client";
import React, { useState } from "react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { createUserResult } from "../actions";
import { useSnackbar } from "notistack";

const GamePreferences = () => {
  const [nickName, setNickName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [model, setModel] = useState("");
  const [designPreference, setDesignPreference] = useState("");
  const [colorPreference, setColorPreference] = useState("");
  const [sizePreference, setSizePreference] = useState("");
  const [seamQuality, setSeamQuality] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    try {
      await createUserResult({
        userResults: [
          {
            question: "Яка ваша улюблена категорія чоловічих трусів?",
            answer: category,
          },
          {
            question: "Яка ваша улюблена фірма виробника трусів?",
            answer: manufacturer,
          },
          {
            question:
              "Який тип тканини ви більше віддаєте перевагу для трусів?",
            answer: fabricType,
          },
          {
            question: "Яка ваша улюблена модель трусів?",
            answer: model,
          },
          {
            question:
              "Як ви ставитеся до використання різноманітних кольорів у трусах?",
            answer: colorPreference,
          },
          {
            question: "Як ви обираєте розмір трусів?",
            answer: sizePreference,
          },
        ],
        userName: nickName,
      });

      enqueueSnackbar("Ваші відповіді успішно відправлені", {
        variant: "success",
      });
      setNickName("");
      setCategory("");
      setManufacturer("");
      setFabricType("");
      setModel("");
      setDesignPreference("");
      setColorPreference("");
      setSizePreference("");
      setSeamQuality("");
    } catch (error) {
      enqueueSnackbar("Введенні дані не коректні", {
        variant: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 ml-60">
      <h1>Введіть ваше ім&#39;я</h1>

      <div className="w-64">
        <Input
          value={nickName}
          onValueChange={setNickName}
          placeholder="Ваше ім'я"
          size="sm"
        />
      </div>
      <div>
        <h3>Яка ваша улюблена категорія чоловічих трусів?</h3>
        <RadioGroup value={category} onValueChange={setCategory}>
          <Radio value="a">a) Класичні</Radio>
          <Radio value="b">b) Спортивні</Radio>
          <Radio value="c">c) Труси-боксери</Radio>
          <Radio value="d">d) Стринги</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>Яка ваша улюблена фірма виробника трусів?</h3>
        <RadioGroup value={manufacturer} onValueChange={setManufacturer}>
          <Radio value="a">a) Calvin Klein</Radio>
          <Radio value="b">b) Hugo Boss</Radio>
          <Radio value="c">c) Tommy Hilfiger</Radio>
          <Radio value="d">d) Armani</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>Який тип тканини ви більше віддаєте перевагу для трусів?</h3>
        <RadioGroup value={fabricType} onValueChange={setFabricType}>
          <Radio value="a">a) Бавовна</Radio>
          <Radio value="b">b) Віскоза</Radio>
          <Radio value="c">c) Льон</Radio>
          <Radio value="d">d) Синтетика</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>Яка ваша улюблена модель трусів?</h3>
        <RadioGroup value={model} onValueChange={setModel}>
          <Radio value="a">a) Сліп</Radio>
          <Radio value="b">b) Боксери</Radio>
          <Radio value="c">c) Труси-брифи</Radio>
          <Radio value="d">d) Труси-стрінги</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>Які ваші уподобання стосовно дизайну трусів?</h3>
        <RadioGroup
          value={designPreference}
          onValueChange={setDesignPreference}
        >
          <Radio value="a">a) Простий і класичний</Radio>
          <Radio value="b">b) Модний і стильний</Radio>
          <Radio value="c">c) Яскравий і оригінальний</Radio>
          <Radio value="d">d) Екзотичний і вишуканий</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>
          Як ви ставитеся до використання різноманітних кольорів у трусах?
        </h3>
        <RadioGroup value={colorPreference} onValueChange={setColorPreference}>
          <Radio value="a">a) Переважно нейтральні кольори</Radio>
          <Radio value="b">b) Я люблю яскраві та насичені кольори</Radio>
          <Radio value="c">c) Залежить від настрою і обстановки</Radio>
          <Radio value="d">d) Не впевнений</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>Як ви обираєте розмір трусів?</h3>
        <RadioGroup value={sizePreference} onValueChange={setSizePreference}>
          <Radio value="a">a) Точний розмір за таблицею</Radio>
          <Radio value="b">
            b) Зазвичай менший розмір для більшої підтримки
          </Radio>
          <Radio value="c">
            c) Зазвичай більший розмір для більшого комфорту
          </Radio>
          <Radio value="d">d) Експериментую з розмірами</Radio>
        </RadioGroup>
      </div>

      <div>
        <h3>Чи важлива для вас якість швів у трусах?</h3>
        <RadioGroup value={seamQuality} onValueChange={setSeamQuality}>
          <Radio value="a">a) Так, це дуже важливо</Radio>
          <Radio value="b">b) Не дуже</Radio>
          <Radio value="c">c) Залежить від ціни</Radio>
          <Radio value="d">d) Не впевнений</Radio>
        </RadioGroup>
      </div>
      <div className="w-64 m-auto mb-40">
        <Button color="primary" onClick={handleSubmit}>
          Відправити результати
        </Button>
      </div>
    </div>
  );
};

export default GamePreferences;
