const Object = require('./Object');
const ItemNames = require('../utils/items/Francais');
const ItemValues = require('../utils/items/Values');
const Text = require('../text/Francais');
const DefaultValues = require('../utils/DefaultValues');

class ObjectManager {


    /**
     * Return an object matching with the piece of object that own a specific id
     * @param id - The id of the object that has to be loaded
     * @returns {*} - An object
     */
    getObjectById(id) {
        return new Object(id, ItemValues.object[id].rareness, ItemValues.object[id].power, ItemValues.object[id].nature);
    }


    /**
     * Return string containing a description of an object
     * @param object - The object that has to be displayed
     * @returns {String} - The description of the object
     */
    displayObject(object) {
        console.log(object);
        let stringResult = ItemNames.object[object.id] + Text.objectManager.separator + Text.rarities[object.rareness] + Text.objectManager.separator + Text.nature.intro[object.natureEffect];
        if (object.natureEffect != 0) { // affichage de la puissance de l'effet si il existe
            stringResult += object.power + Text.nature.outroObject[object.natureEffect];
        }
        return stringResult;
    }


    /**
     * Return string containing a description of an object in case this object is the default armor
     * @param object - The object that has to be displayed
     * @returns {String} - The description of the object
     */
    displayDefaultObject(object) {
        return ItemNames.object[object.id];
    }


    /**
     * Choose a random object in the existing ones. (take care of the rareness)
     * @returns {*} - A random object
     */
    generateRandomObject() {
        let desiredRareness = this.generateRandomRareness();
        let id = this.generateRandomObjectId();
        let tries = 1;
        while (ItemValues.object[id].rareness != desiredRareness) {
            tries++;
            id = this.generateRandomObjectId();
        }
        console.log("Item généré ! Nombre d'essais: " + tries)
        return this.getObjectById(id);
    }


    /**
     * Generate an id of an existing object totally randomly without taking care of the rareness
     * @returns {Number} - A random Id
     */
    generateRandomObjectId() {
        return Math.round(Math.random() * (DefaultValues.raritiesGenerator.numberOfObject - 1)) + 1;
    }


    /**
     * Generate a random rareness. Legendary is very rare and common is not rare at all
     * @returns {Number} - the number refering to a rareness (1 - 7) 
     */
    generateRandomRareness() {
        let randomValue = Math.round(Math.random() * DefaultValues.raritiesGenerator.maxValue);
        let desiredRareness = 1;
        while (randomValue > DefaultValues.raritiesGenerator[desiredRareness - 1]) {
            desiredRareness++;
        }
        return desiredRareness;
    }

}

module.exports = ObjectManager;