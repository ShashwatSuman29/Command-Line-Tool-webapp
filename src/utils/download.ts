/**
 * Utility function to trigger a file download
 * @param url The URL of the file to download
 * @param filename Optional custom filename for the downloaded file
 */
export const downloadFile = (url: string, filename?: string): void => {
  // Create a link element
  const link = document.createElement('a');
  
  // Set the href to the file URL
  link.href = url;
  
  // Set download attribute with optional filename
  if (filename) {
    link.setAttribute('download', filename);
  } else {
    link.setAttribute('download', '');
  }
  
  // Append to the body
  document.body.appendChild(link);
  
  // Trigger the click event
  link.click();
  
  // Remove the link from the DOM
  document.body.removeChild(link);
};

/**
 * Download the DevHelper CLI installer
 */
export const downloadCliInstaller = (): void => {
  const installerPath = '/downloads/devhelper-cli-setup.zip';
  downloadFile(installerPath, 'devhelper-cli-setup.zip');
};
