/**
 * Display a greeting in 'A1' based on the time of day.
 *
 * @summary Welcome Greeting
 *
 * @remarks
 * * This function is run on load because the function is exported as 'default'.
 * * Only one default function is allowed per script.
 * * The function name is not important but 'main' is the convention.
 */
export default function main(sheet: SheetXL.ISheet): void {
  const now = new Date();
  const hours = now.getHours();
  let greeting = '';
  // 'undefined' means ignore the property and keep the existing value.
  let color = undefined;
  // 'null' means clear the existing values. We always set a color in case the default is the same.
  let fontColor = null;

  if (now.getMonth() === 11 && now.getDate() === 25) { // Christmas
    greeting = '🎄 Merry Christmas';
    color = SheetXL.IColor.Named.MistyRose;
  } else if (now.getMonth() === 0 && now.getDate() === 1) { // New Year
    greeting = '🎉 Happy New Year';
    color = SheetXL.IColor.Named.Gold;
    color = SheetXL.IColor.Named.Red;
  } else if (hours < 12) {
    greeting = '☀️ Good morning';
    color = SheetXL.IColor.Named.Yellow;
    fontColor = SheetXL.IColor.Named.WindowText;
  } else if (hours < 18) {
    greeting = '🌞 Good afternoon';
    color = SheetXL.IColor.Named.Orange;
    fontColor = SheetXL.IColor.Named.WindowText;
  } else {
    greeting = '🌜 Good evening';
    color = SheetXL.IColor.Named.Blue;
    fontColor = SheetXL.IColor.Named.Yellow;
  }

  const range = sheet.getRange('a1');
  // set greeting
  range.setValues([[greeting]]);
  // update the style
  range.getStyle()
    .update({ 
      fill: color,
      font: {
        size: 20,
        fill: fontColor
      }
    });
  range.autoFit();
}