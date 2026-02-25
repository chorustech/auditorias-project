import { PointerArea } from "@/utils/pointerArea";

type Questions = {
  pointer: PointerArea;
  sections: {
    name: string;
    questions: {
      sentence: string;
      subquestions?: {
        sentence: string;
      }[];
    }[];
  }[];
};

type QuestionDictionary = {
  [pointer: string]: Questions;
};

export const reportsQuestions: QuestionDictionary = {
  "baldwin-state": {
    pointer: "baldwin-state",
    sections: [
      {
        name: "Coordinador",
        questions: [
          {
            sentence:
              "Durante el surtido de materiales, ¿Son utilizados los catálogos, ayudas visuales o instrucciones de trabajo?",
          },
          {
            sentence:
              "En el Pick List los materiales surtidos deben ser remarcados por el coordinador, así como hacer el uso del sello de material revisado",
          },
          {
            sentence:
              "Acabados similares no deben encontrarse dentro del mismo pizza tray surtido (para evitar que se confundan y/o mezclen)",
          },
          {
            sentence:
              "Las órdenes surtidas a la línea deben ser surtidas una orden por charola",
          },
        ],
      },
      {
        name: "Matrices",
        questions: [
          {
            sentence:
              "Las órdenes surtidas a la línea deben ser surtidas una orden por charola (a excepción de IMG11 6 KLV11), siendo el estilo, acabado y cantidad correcta, así como con las etiquetas UPC correspondientes",
          },
        ],
      },
      {
        name: "Herramientas",
        questions: [
          {
            sentence:
              "Los torques (neumáticos y manuales) deben encontrarse calibrados (verificar la etiqueta de calibración)",
          },
          {
            sentence:
              "¿El dispensado de grasa para bisagras está operando correctamente?, ¿Al inspeccionar la bisagra ensamblada se observa la presencia de grasa en el pin?",
          },
        ],
      },
      {
        name: "Operador",
        questions: [
          {
            sentence:
              "Verificar que el personal de la celda este utilizando guantes durante su operación previniendo que el material no tenga huellas, partículas extrañas o exceso de aceite. Las operaciones donde no se necesitan guantes son:",
            subquestions: [
              {
                sentence: "Órdenes de empaques sin acabados (componentes)",
              },
              {
                sentence: "Operación de etiquetados (UPC y/o Master)",
              },
              {
                sentence:
                  "Empaque con acabados envueltos (Foam, bolsas y/o papel)",
              },
            ],
          },
          {
            sentence:
              "¿El operador verifica con pick list, ayudas visuales, instrucciones de trabajo, todos los componentes incluyendo etiquetas de la orden requerida?, ¿El pick list es marcado por el operador y coordinador?",
          },
          {
            sentence: "Durante la operación de ensamble y/o empaque el empleado hace el uso de ayudas visuales/instrucciones de trabajo"
          },
          {
            sentence:
              "Durante la operación de empaque el empleado debe hacer el uso correcto del sello de identificación",
          },
          {
            sentence:
              "El operador realiza la prueba funcional que indica la instrucción de trabajo. En el caso específico de TRM11 e IMG12, ¿El operador realiza prueba de evaluación del Gap entre el ensamble del Top Plate y el Small Plate?",
          },
          {
            sentence:
              "¿El operador utiliza templates para verificación de escudos?, ¿Los templates están disponibles y en buenas condiciones? (aplicable para TRM11, IMG12, IMG22, PAT11, P70)",
          },
          {
            sentence:
              "¿Todo el material está debidamente identificado con su UPC y LPN correspondiente?",
          },
          {
            sentence:
              "El material en la línea de producción cuenta con un contenedor, cuenta con una etiqueta de identificación de su número de parte, físicamente hay una pieza del componente pegada al contenedor",
          },
          {
            sentence:
              "Las etiquetas UPC deben corresponder al material empacado y etiquetadas en flujo continuo (colocación de etiqueta UPC por pieza empacada)",
          },
          {
            sentence:
              "Para la impresión de la etiqueta LPN, el operador escanea el pick list y la etiqueta que se encuentra pegada en la caja producida",
          },
        ],
      },
    ],
  },
  "baldwin-reserve-supply": {
    pointer: "baldwin-reserve-supply",
    sections: [
      {
        name: "Proceso de surtido",
        questions: [
          {
            sentence:
              "¿El personal del área de picking/surtido está entrenado en la operación? (verificar matriz con coordinador de entrenamiento)",
          },
          {
            sentence:
              "Previo al proceso de surtido, ¿Se revisa que el carro a utilizar este disponible y sea el número asignado a la orden?",
          },
          {
            sentence:
              "Previo al proceso de surtido ¿El picker se asegura que el carro tenga los contenedores apropiados, limpios, en buen estado y que la cantidad de contenedores sea de acuerdo con el requerimiento?",
          },
          {
            sentence:
              "Durante el surtido de materiales ¿El proceso se realiza de acuerdo con la instrucción de trabajo/procedimiento?",
          },
          {
            sentence:
              "¿La distribución/acomodo de los componentes en los contenedores del carro, es de acuerdo con el estándar establecido? Por ejemplo:",
            subquestions: [
              {
                sentence:
                  "Contenedores transparentes para latches, tornillería, wrench tool, instructivos, tornillería LPP",
              },
              {
                sentence:
                  "Contenedor transparente pequeño para botones de privacidad, tornillo para chassis versión ENTRY para levers únicamente, adaptador Dummy cuadrado de plástico blanco para conversión del Turn Piece",
              },
              {
                sentence:
                  "Contenedor con foam con agujeros para cilindros, llaves y spacer de plástico blanco, mecanismo metálico Dummy",
              },
              {
                sentence: "Contenedor con foam para Chassis, Rosas, Handle set",
              },
            ],
          },
          {
            sentence:
              "Una vez terminado el proceso de surtido de material ¿El picker audita su orden para revisar si surtió todos los componentes?",
          },
          {
            sentence:
              "Una vez terminado el revisado de la orden por el picker ¿El carro es enviado al área correspondiente? Por ejemplo:",
            subquestions: [
              {
                sentence: "Área de stacking",
              },
              {
                sentence: "Área de cilindros",
              },
              {
                sentence: "Área de empaque",
              },
            ],
          },
          {
            sentence:
              "¿Las ordenes surtidas a la línea no sobrepasan la cantidad de piezas máximas definida por orden?",
          },
        ],
      },
    ],
  },
  "baldwin-reserve-stacking": {
    pointer: "baldwin-reserve-stacking",
    sections: [
      {
        name: "Proceso de stacking",
        questions: [
          {
            sentence:
              "¿El personal del área de stacking está entrenado en la operación? (verificar matriz con coordinador de entrenamiento)",
          },
          {
            sentence:
              "¿El personal del área de stacking escanea la orden e instala los nidos en la prensa de acuerdo con el programa? (información en pantalla de computadora)",
          },
          {
            sentence:
              "¿El personal del área de stacking tiene la instrucción de trabajo abierta con respecto a la orden que está procesando?",
          },
          {
            sentence:
              "¿Los nidos de la prensa están ordenados en el rack?, ¿Está la cantidad de nidos requeridos para cada máquina en su rack?, ¿Los nidos están en buenas condiciones?",
            subquestions: [
              {
                sentence:
                  "¿Nidos para rosas/chassis internos con dos pones de 0.167’’ de grosor y una altura de 0.500?",
              },
              {
                sentence:
                  "¿Nidos para exteriores, para rosas redondas de la función ENTRY cuentan con el sujetador metálico y en buenas condiciones?",
              },
            ],
          },
          {
            sentence:
              "¿El personal del área de stacking procesa el material en base al estándar de operación establecido?, ¿Respeta la cantidad de piezas o componentes máximos sobre su estación de trabajo/mesa?",
          },
          {
            sentence:
              "¿Están los torques manuales (de batería) en buen estado, con carga en la batería y con puntas/desarmador en buenas condiciones?",
          },
          {
            sentence:
              "¿El personal del área de stacking sabe identificar una orden en función Dummy?, ¿Tiene el conocimiento de como realizar la conversión de un Handle Set y Turn Piece a versión Dummy?",
          },
          {
            sentence:
              "¿Está el contenedor identificado para el mecanismo que se retira del Handle Set durante la conversión a full Dummy?",
            subquestions: [
              {
                sentence:
                  "Nota: El contenedor no debe presentar exceso de material (al borde del derrame)",
              },
            ],
          },
          {
            sentence:
              "¿El personal del área de stacking sabe identificar una orden en función ENTRY?, ¿Tiene el conocimiento de como realizar la instalación del Tornillo en el Lever?",
          },
          {
            sentence:
              "¿El personal del área de stacking realiza la segregación del material discrepante?, ¿Existe un contenedor rojo para material discrepante?, ¿Realiza el reporte de scrap diariamente?",
          },
        ],
      },
    ],
  },
  "baldwin-reserve-packing": {
    pointer: "baldwin-reserve-packing",
    sections: [
      {
        name: "Proceso de empaque",
        questions: [
          {
            sentence:
              "¿El personal del área de empaque está entrenado en la operación? (verificar matriz con coordinador de entrenamiento)",
          },
          {
            sentence:
              "¿El personal del área de empaque escanea orden de trabajo para verificar que se surtió todos los componentes requeridos para la orden en proceso?",
          },
          {
            sentence:
              "¿El personal del área de empaque busca y abre la instrucción de trabajo de empaque en base a la descripción del producto listado en la orden de trabajo?",
          },
          {
            sentence:
              "¿El personal del área de empaque verifica los números de parte que se le surtieron contra la orden de trabajo/pick list?",
          },
          {
            sentence:
              "¿El personal del área de empaque verifica que los números de parte del Handle Set y Turn Piece por acabo, forma y función de acuerdo con la orden de trabajo en proceso?",
          },
          {
            sentence:
              "¿El personal del área de empaque realiza la prueba funcional de llaves y cilindros? (aplicable cuando el producto en proceso requiera cilindros)",
          },
          {
            sentence:
              "¿El material como cajas master, cajas unitarias, separadores, foam está debidamente identificados, organizados y acomodados en su lugar asignado?",
          },
          {
            sentence:
              "¿El personal del área de empaque procesa el material en base al estándar de operación establecido?, ¿Respeta la cantidad de piezas o componentes máximos sobre su estación de trabajo/mesa?",
          },
          {
            sentence:
              "Durante la operación de empaque el empleado debe hacer el uso correcto del sello de identificación",
          },
          {
            sentence:
              "Para la impresión de la etiqueta LPN, ¿El operador escanea la orden de trabajo y la pega inmediatamente a la caja de la unidad empacada?",
          },
          {
            sentence:
              "¿El personal del área de empaque realiza la segregación del material discrepante?, ¿Existe contenedor rojo para material discrepante?, ¿Realiza reporte de scrap diariamente?",
          },
          {
            sentence:
              "Una vez terminado el proceso de empaque, ¿El personal mueve el carro al área asignado para su siguiente proceso?",
          },
        ],
      },
    ],
  },
  "baldwin-reserve-general": {
    pointer: "baldwin-reserve-general",
    sections: [
      {
        name: "Generales",
        questions: [
          {
            sentence:
              "¿El personal del área de stacking realiza la segregación del material discrepante?, ¿Existe un contenedor rojo para material discrepante?, ¿Realiza el reporte de scrap diariamente?",
          },
          {
            sentence:
              "Verificar que el personal de picking, stacking, ensamble de cilindros y proceso de empaque utilice el sello del operador:",
            subquestions: [
              {
                sentence:
                  "Picker, stacker y ensamble de cilindro deben de estampar la hoja del pick list con su sello",
              },
              {
                sentence:
                  "Empacador debe estampar la caja de empaque con su sello",
              },
            ],
          },
          {
            sentence:
              "Para la línea de cilindros y cortes de llave, se debe verificar visual y funcionalmente lo siguiente:",
            subquestions: [
              {
                sentence:
                  "Verificar que se corra una orden a la vez/una pieza a la vez (one piece flow)",
              },
              {
                sentence: "No acumulamiento de material",
              },
              {
                sentence:
                  "Que la llave sea la requerida en la orden de trabajo (evitar mezclar llaves)",
              },
              {
                sentence:
                  "Que se realiza la prueba funcional del cilindro con su llave",
              },
              {
                sentence:
                  "Que el número grabado en la llave corresponda al número que sale en la orden de trabajo",
              },
            ],
          },
        ],
      },
      {
        name: "Embarques",
        questions: [
          {
            sentence:
              "Verificar que cada pallet terminado tiene su identificación de BOL (si hay más de un pallet sin la identificación es considerado falla)",
          },
        ],
      },
    ],
  },
  "display-area": {
    pointer: "display-area",
    sections: [
      {
        name: "Checklist",
        questions: [
          {
            sentence:
              "¿El personal del área de picking/surtido está entrenado en la operación? (verificar matriz con coordinador de entrenamiento)",
          },
          {
            sentence:
              "El material en la línea de producción cuenta con un contenedor y con una etiqueta de identificación de su número de parte",
          },
          {
            sentence:
              "¿Durante el surtido de materiales son utilizados los catálogos, ayudas visuales o instrucciones de trabajo?",
          },
          {
            sentence:
              "El operador realiza la prueba funcional que indica la instrucción de trabajo, el material sin daños y ensamblado apropiadamente (no material con golpes y flojos)",
          },
          {
            sentence:
              "Durante el ensamble de materiales, ¿El proceso se realiza de acuerdo con la instrucción de trabajo/procedimiento?",
          },
          {
            sentence:
              "Durante la operación de empaque el empleado debe hacer el uso correcto del sello de identificación",
          },
        ],
      },
    ],
  },
  "pizza-tray": {
    pointer: "pizza-tray",
    sections: [
      {
        name: "Checklist",
        questions: [
          {
            sentence:
              "¿La charola está identificada apropiadamente? (fotografía, código de barra)",
          },
          {
            sentence:
              "¿Los separadores están en buen estado? (¿Son los separadores correctos?, ¿Está estandarizado?, ¿No están encimadas las piezas?)",
          },
          {
            sentence:
              "¿Es aceptable la cantidad de material en la charola? (sobre inventario, pero excesivo)",
          },
          {
            sentence: "¿El material esta mezclado? (color, configuración)",
          },
          {
            sentence:
              "Generar AQL e inspección visual (verificar problemas estéticos, golpes, rayas, color)",
          },
        ],
      },
    ],
  },
};
