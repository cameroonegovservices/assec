import isemail from 'isemail';
import omit from 'lodash.omit';
import Mongoose from 'mongoose';
import {
  SUOModel,
  ZoneModel,
  Departement,
  Restriction,
  SubscriberModel,
} from './drivers/mongodb';

const suoskeys = ['situations', 'origines', 'usages'];

const createSUO = (obj, id) => ({
  // cree un nouveau SUO
  // en definissant son departement de rattachement
  department: id,
  label: obj.label,
});

export const Mutation = {
  /* -----------------------------------

  DEPARTEMENTS

  ----------------------------------- */
  createDepartement: (_, args) => {
    const base = omit(args, suoskeys);
    const id = new Mongoose.Types.ObjectId();
    return Promise.all([
      SUOModel.create(args.usages.map(o => createSUO(o, id))),
      SUOModel.create(args.origines.map(o => createSUO(o, id))),
      SUOModel.create(args.situations.map(o => createSUO(o, id))),
    ]).then(([usages, origines, situations]) => {
      const doc = new Departement({ ...base, _id: id });
      doc.set('usages', usages);
      doc.set('origines', origines);
      doc.set('situations', situations);
      return doc.save();
    });
  },

  deleteDepartment: (_, args) =>
    Departement.findByIdAndRemove(args.id).then(doc =>
      Promise.all([
        SUOModel.deleteMany({ department: doc.id }),
        ZoneModel.deleteMany({ department: doc.id }),
        Restriction.deleteMany({ department: doc.id }),
      ]).then(() => doc)),

  updateDepartement: (_, args) => {
    const { id } = args;
    const rest = omit(args, ['id']);
    const returnsnewdoc = { new: true };
    return Departement.findByIdAndUpdate(id, rest, returnsnewdoc);
  },

  /* -----------------------------------

  RESTRICTIONS

  ----------------------------------- */

  createRestriction: (_, args) => Restriction.create(args),
  deleteRestriction: (_, args) =>
    // FIXME -> remove restriction sur une zone
    Restriction.findByIdAndRemove(args.id),

  /* -----------------------------------

  ALERTE

  ----------------------------------- */
  createZone: (_, args) => ZoneModel.create(args),
  deleteZone: (_, args) => ZoneModel.findByIdAndRemove(args.id),

  // UPDATES
  updateZoneAlerte: (_, args) => {
    const { id, situationid } = args;
    return ZoneModel.findByIdAndUpdate(
      id,
      {
        // update values
        $set: { 'alerte.situation': situationid },
      },
      {
        // should returns updated document
        new: true,
      },
    )
      .populate('alerte.situation')
      .exec();
  },

  /* -----------------------------------

  SUBSCRIBERS

  ----------------------------------- */
  createSubscriber: (_, args) => {
    const { email } = args;
    if (!isemail.validate(email)) throw new Error('Invalid email');
    return SubscriberModel.findOne({ email })
      .then((doc) => {
        if (!doc) return SubscriberModel.create(args);
        return doc;
      })
      .catch(err => err);
  },
};

export default Mutation;
