/**
 * Add a movable image and move it to the top left.
 *
 * @summary Create Image
 *
 * @remarks
 * * Demonstrates how to add an image to the current sheet and move it to the top left.
 * * Provides an example on how to move the image to a specific location.
 * * Provides illustration on autoSelect.
 */
export async function createImage(workbook: SheetXL.IWorkbook): Promise<void> {
  /* Get the movables collection from the selected sheet */
  const movables = workbook.getSelectedSheet().getMovables();
  /* Add an image url. Resources can also be added. autoSelect false is the default */
  const image = await movables.addImage('https://www.sheetxl.com/logo-text.svg', { autoSelect: false });
  /* move to 10, 10. Default is current anchor location. */
  image.setBounds({ x: 10, y: 10 });
  /* scroll into view. Not needed if autoSelect is true */
  await image.scrollIntoView();
  /* Select. not needed if auto select is true. */
  // image.select();
}