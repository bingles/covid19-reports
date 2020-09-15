import { Response } from 'express';
import { Org } from "./org.model";
import { BadRequestError, NotFoundError } from "../../util/error";

export namespace OrgController {

  export async function getOrg(req: any, res: Response) {
    const orgId = req.params['orgId'];
    const org = await Org.findOne({
      where: {
        id: parseInt(orgId)
      }
    });
    if (!org) {
      throw new NotFoundError('Organization was not found');
    }
    await res.json(org);
  }

  export async function addOrg(req: any, res: Response) {
    let name: string = req.body['name'];
    let description: string = req.body['description'];
    if (!name) {
      throw new BadRequestError('An organization name must be supplied when adding an organization.');
    }
    if (!description) {
      throw new BadRequestError('An organization description must be supplied when adding an organization.');
    }
    const org = new Org();
    org.name = name;
    org.description = description;
    const newOrg = await org.save();
    await res.status(201).json(newOrg);
  }

  export async function deleteOrg(req: any, res: Response) {
    const orgId = req.params['orgId'];
    const org = await Org.findOne({
      where: {
        id: parseInt(orgId)
      }
    });
    if (!org) {
      throw new NotFoundError('Organization could not be found.');
    }
    const removedOrg = await org.remove();
    await res.json(removedOrg);
  }

  export async function updateOrg(req: any, res: Response) {
    const orgId = req.params['orgId'];
    const org = await Org.findOne({
      where: {
        id: parseInt(orgId)
      }
    });
    if (!org) {
      throw new NotFoundError('Organization could not be found.');
    }
    let name: string = req.body['name'];
    if (name) {
      org.name = name;
    }
    let description: string = req.body['description'];
    if (description) {
      org.description = description;
    }
    const updatedOrg = await org.save();
    await res.json(updatedOrg);
  }
}
