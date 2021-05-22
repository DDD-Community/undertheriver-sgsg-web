import { Howl } from 'howler';

export const effectSound = (src: string | string[], volume = 1) => {
  let sound;
  // eslint-disable-next-line no-shadow
  const soundInject = (src: string | string[]) => {
    sound = new Howl({ src });
    sound.volume(volume);
  };
  soundInject(src);
  return sound;
};
