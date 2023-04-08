import { Response } from 'miragejs';

function getExtensionReuests(schema, request) {
  try {
    let taskId = request.queryParams.taskId;
    let extensionObject = schema.extensionRequests.findBy({ taskId })?.attrs;
    if (extensionObject) {
      return {
        message: 'Extension Requests returned successfully!',
        allExtensionRequests: [extensionObject],
      };
    }
    return {
      message: 'Extension Requests returned successfully!',
      allExtensionRequests: [],
    };
  } catch (error) {
    return new Response(404, {}, { errors: 'Extension not found' });
  }
}

function createExtensionRequest(schema, request) {
  try {
    let extensionData = JSON.parse(request.requestBody);
    schema.extensionRequests.create(extensionData);
    return {
      message: 'Extension Request created successfully!',
      extensionRequest: extensionData,
    };
  } catch (error) {
    return new Response(404, {}, { errors: 'Something went wrong' });
  }
}

export { getExtensionReuests, createExtensionRequest };
