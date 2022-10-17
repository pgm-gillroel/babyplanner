import typeorm from 'typeorm';

const { getConnection } = typeorm;

export const getModule = async (objectName, req, res, next) => {
  try {
    // get optional req parameters
    const { objectId } = req.params;
    // get the repository
    const objectRepository = getConnection().getRepository(objectName);
    const { relations } = objectRepository.metadata;
    const relationNames = relations.map((relation) => relation.propertyName);
    if (objectId) {
      const object = await objectRepository.find({ id: objectId });
      // get the interests and return them with status code 200
      res.status(200).json(
        await objectRepository.find({
          where: { object },
          relations: relationNames,
        })
      );
    } else {
      // get the interests and return them with status code 200
      res
        .status(200)
        .json(await objectRepository.find({ relations: relationNames }));
    }
    // get the interests and return them with status code 200
  } catch (e) {
    next(e.message);
  }
};

export const getSingleModule = async (objectName, req, res, next) => {
  try {
    // get req parameters
    let { id } = req.params;

    if (!id) throw new Error('Please specify id to get');

    // get object repo
    const objectRepository = getConnection().getRepository(objectName);
    const { relations } = objectRepository.metadata;
    const relationNames = relations.map((relation) => relation.propertyName);
    id = parseInt(id, 10);
    // filter object out of repo
    const object = await objectRepository.findOne({
      where: { id },
      relations: relationNames,
    });
    // check if object exists
    if (!object) throw new Error(`${objectName} with id: ${id} was not found`);
    res.status(200).json(object);
  } catch (e) {
    next(e.message);
  }
};

export const postModule = async (objectName, req, res, next) => {
  try {
    // get the repository
    const objectRepository = getConnection().getRepository(objectName);
    // get the interests and return them with status code 200
    await objectRepository.save(req.body);
    res.status(200).json({ status: `Posted ${objectName}` });
  } catch (e) {
    next(e.message);
  }
};

export const deleteModule = async (objectName, req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new Error('Please specify id to remove');
    const objectRepository = getConnection().getRepository(objectName);
    const object = await objectRepository.findOne({
      where: { id },
    });
    if (!object) throw new Error(`${objectName} with id: ${id} was not found`);
    await objectRepository.remove({ id });
    res.status(200).json({ status: `Deleted ${objectName} with id: ${id}` });
  } catch (error) {
    next(error.message);
  }
};

export const updateModule = async (objectName, req, res, next) => {
  try {
    const objectRepository = getConnection().getRepository(objectName);
    const object = await objectRepository.findOne({
      where: { id: req.body.id },
    });
    await objectRepository.save({
      ...object,
      ...req.body,
    });
    res.status(200).json({ status: `updated object with id: ${object.id}` });
  } catch (error) {
    next(error.message);
  }
};
