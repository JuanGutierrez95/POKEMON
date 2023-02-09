const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{ //el campo ID es importantisimo
      type: DataTypes.UUID, /*UUID: Es un numero unico que se utiliza como identificador. Tiene x caracteres en total. Cada uno de los caracteres va ser un extra decimal, es decir puede tomar valores de 0 al 9, de la A a la f. Se forma de manera aleatoria dependiendo de la version del estandar que estamos utilizando. 36 caracteres(32 digitos mas 4 guiones), 16 bytes, 128 bits */
      defaultValue: DataTypes.UUIDV4, //Se genera solo automaticamente
      primaryKey: true,
      allowNull: false,
      unique: true //es unico
    },
    name: {
      type: DataTypes.STRING,
      validate:{
        isAlpha: true, 
        len: [0, 30] 
      },
      allowNull: false, //No me podes dejar el nombre en blanco,no podes no mandarle el nombre si quere crear algo aca. No te permito null 
      unique: true 
    },
    hp:{ 
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 999,
      },
      defaultValue: 10,// En caso de no recibir un valor el default va a ser '10'
      allowNull: false
    },
    attack:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 999
      },
      defaultValue: 10,// En caso de no recibir un valor el default va a ser '10'
      allowNull: false
    },
    defense:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 999
      },
      defaultValue: 10,// En caso de no recibir un valor el default va a ser '10'
      allowNull: false
    },
    speed:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 999
      },
      defaultValue: 10,// En caso de no recibir un valor el default va a ser '10'
      allowNull: false
    },
    height:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 999
      },
      defaultValue: 10,// En caso de no recibir un valor el default va a ser '10'
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,
      validate:{
        min: 1,
        max: 9999
      },
      defaultValue: 10,// En caso de no recibir un valor el default va a ser '10'
      allowNull: false
    },
    sprite:{
      type: DataTypes.STRING,
      defaultValue: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/d7621acf3e5b732050acd51c2f16cdba/large.gif",
      validate:{
        isUrl: true
      },
      allowNull: false
    },
    createInDb:{ //Para que nos sirve el createInDb? Porque si queremos hacer un llamado a la base de datos. Cuando se hace una distencion entre lo que me trae la api y la base de datos. Es mucho mas facil acceder al pokemon que yo cree en la base de datos. Con esta propiedad, porque basicamente mi pokemon en la base de datos la va a tener y todo el resto no. Lo seteo y le digo que es un boolen, defaultValue true. 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps: false // sequalize crea automaticamente los modelos createAt y updateAt, esto lo cancelamos con el timestamps. El createdAtcampo contendrá la marca de tiempo que representa el momento de la creación y updatedAtcontendrá la marca de tiempo de la última actualización.
    //freezeTableName: true,
    // nos sirve para verificar que el nombre de la tabla es igual al nombre del modelo que le estamos enviando.
  });
};


//La instancia de sequelize define los modelos




/*
De mas tipos de datos
ENUM
ARRAY
INTEGER
TEXT
*/