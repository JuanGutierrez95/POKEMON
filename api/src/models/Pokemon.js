const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{ 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
      allowNull: false,
      unique: true 
    },
    name: {
      type: DataTypes.STRING,
      validate:{
        isAlpha: true, 
        len: [0, 40] 
      },
      allowNull: false, 
      unique: true 
    },
    hp:{ 
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 500,
      },
      defaultValue: 10,
    },
    attack:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 500
      },
      defaultValue: 10,
      allowNull: false
    },
    defense:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 500
      },
      defaultValue: 10,
      allowNull: false
    },
    speed:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 500
      },
      defaultValue: 10,
      allowNull: false
    },
    height:{
      type: DataTypes.INTEGER,
      validate:{
        isNumeric: true,
        min: 1,
        max: 100
      },
      defaultValue: 10,
      allowNull: false,
    },
    weight:{
      type: DataTypes.INTEGER,
      validate:{
        min: 1,
        max: 9999
      },
      defaultValue: 10,
      allowNull: false
    },
    sprite:{
      type: DataTypes.STRING, 
      defaultValue: "https://d2t1xqejof9utc.cloudfront.net/screenshots/pics/d7621acf3e5b732050acd51c2f16cdba/large.gif", //MODIFICAR
      validate:{
        isUrl: true
      },
      allowNull: false
    },
    createdInDb:{ 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps: false 
    
  });
};
