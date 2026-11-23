---
slug: switch-in-react-native
title: 'Switch in React Native: How to Build a Working Toggle'
description: 'Learn how to use the switch in React Native: controlled state, styling, accessibility, iOS and Android differences, and form integration with examples.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-11-23T09:36:42.030Z
updated_at: 2026-11-23T09:36:43.531Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/ff3f9cb3-598d-4564-9013-f6cd742eadca/switch-in-react-native-toggle-switch.jpg'
head_image_alt: 'Switch in React Native: How to Build a Working Toggle'
keywords: 'React Native switch, React Native toggle, controlled component, switch accessibility, form toggle state'
tag: 'Mobile, Tutorial'
published: true
locale: en
next_blog: ''
---
You've added a notification toggle to your settings screen. It renders correctly, but tapping it makes the knob move and immediately jump back. Then you test on Android and discover that the colors don't look like the iPhone version either.

A working **Switch in React Native** needs more than an event handler and a brand color. Treat it as a controlled form input, decide who owns the preference, and let each platform handle the native interaction. The important work is keeping the displayed value, saved preference, and accessible state aligned.

## Table of Contents
- [Props and a Minimal Working Switch](#props-and-a-minimal-working-switch)
  - [Switch props at a glance](#switch-props-at-a-glance)
- [How to Keep Switch State in Sync](#how-to-keep-switch-state-in-sync)
  - [A save handler with rollback](#a-save-handler-with-rollback)
- [Styling Track and Thumb Colors on Each Platform](#styling-track-and-thumb-colors-on-each-platform)
  - [Resize the visual without squeezing the row](#resize-the-visual-without-squeezing-the-row)
- [Making the Switch Usable with Screen Readers](#making-the-switch-usable-with-screen-readers)
  - [Make the row easier to operate](#make-the-row-easier-to-operate)
- [Connecting Switches to Forms and Global State](#connecting-switches-to-forms-and-global-state)
  - [Where the switch value should live](#where-the-switch-value-should-live)
  - [Keep settings lists selective](#keep-settings-lists-selective)
- [Pre-Release Checklist for Both Platforms](#pre-release-checklist-for-both-platforms)
  - [Fix behavior before polish](#fix-behavior-before-polish)

<a id="props-and-a-minimal-working-switch"></a>
## Props and a Minimal Working Switch

    import { useState } from 'react';
    import { Switch, Text, View } from 'react-native';

    export default function NotificationSetting() {
      const [enabled, setEnabled] = useState(false);

      return (
        <View>
          <Text>Push notifications</Text>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
          />
        </View>
      );
    }

That's the smallest useful implementation: import `Switch`, declare a Boolean, and connect the callback to its setter. The component renders a native toggle, but it doesn't provide a preference label or manage your application's saved setting.

**Your state determines the position.** React Native exposes native platform controls through its JavaScript component API, rather than drawing an identical JavaScript-only control on every device, as explained in [Xebia's platform-specific UI comparison](https://xebia.com/blog/comparing-platform-specific-uis-in-react-native-and-flutter/). You don't need a third-party toggle package for an ordinary binary setting.

<a id="switch-props-at-a-glance"></a>
### Switch props at a glance

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `value` | boolean | `false` | Current on or off position, driven by your state |
| `onValueChange` | function | none | Receives the new Boolean on each user toggle |
| `disabled` | boolean | `false` | Blocks interaction, for example while a save is pending |
| `trackColor` | object | platform default | Track colors for the `false` and `true` keys |
| `thumbColor` | color | platform default | Knob color, verify on each OS version |
| `ios_backgroundColor` | color | platform default | Track background when off, iOS only |

The interaction props apply on both iOS and Android. So do `trackColor` and `thumbColor`, although sharing prop names doesn't guarantee matching pixels; `ios_backgroundColor` is explicitly platform-specific.

Use `onValueChange` when you want the new Boolean directly. Don't confuse it with an event-based handler and try to read `nextValue.target.checked`, which is a web input pattern, not the contract used here.

> **Practical rule:** Choose a switch for an immediate on/off preference. Use a different control when the user must choose among several options or confirm a consequential action.

A dark-mode preference is a reasonable example. A delete-account action isn't, even if its confirmation happens to involve a Boolean somewhere in your code.

For a quick smoke test, place the component in your settings screen and temporarily replace the callback with `(nextValue) => { console.log(nextValue); setEnabled(nextValue); }`. Confirm that the logged Boolean changes and the knob stays in its new position after the first tap.

<a id="how-to-keep-switch-state-in-sync"></a>
## How to Keep Switch State in Sync

The **snap-back bug** usually starts with a callback that logs or saves a value without updating the state passed into `value`. The [React Native Switch API](https://reactnative.dev/docs/switch) explicitly defines the component as controlled: if the supplied value stays unchanged, the rendered switch returns to that value.

For a remotely saved preference, use an optimistic local update with a clear failure path:

1. **Initialize from the saved preference.** Load the setting before mounting the editable field, then pass it as `initialEnabled`. If loading is asynchronous, show a loading state rather than briefly presenting an invented off value.
2. **Update the displayed value immediately.** Accept the Boolean supplied to `onValueChange` and set local state before awaiting persistence. Don't make the user wait for the network before the knob moves.
3. **Persist outside render.** Call your storage or API function from the handler. Rendering should describe the interface, not send writes.
4. **Prevent conflicting requests.** Disable the control while a save is pending when overlapping writes aren't safe. A synchronous request guard also protects against repeated callbacks before React commits the disabled state.
5. **Restore and explain failures.** Revert to the previous value and display an actionable inline error. Don't leave the interface showing a preference the server rejected.

<a id="a-save-handler-with-rollback"></a>
### A save handler with rollback

The following component expects `savePreference` to return a promise and reject when saving fails. Its parent should mount it only after loading the initial preference.

    import { useRef, useState } from 'react';
    import { Switch, Text, View } from 'react-native';

    export function SavedPreference({
      initialEnabled,
      savePreference,
    }) {
      const [enabled, setEnabled] = useState(initialEnabled);
      const [pending, setPending] = useState(false);
      const [error, setError] = useState('');
      const saving = useRef(false);

      async function handleChange(nextValue) {
        if (saving.current) return;

        const previousValue = enabled;
        saving.current = true;
        setEnabled(nextValue);
        setPending(true);
        setError('');

        try {
          await savePreference(nextValue);
        } catch {
          setEnabled(previousValue);
          setError('Could not save. Check your connection and try again.');
        } finally {
          saving.current = false;
          setPending(false);
        }
      }

      return (
        <View>
          <Switch
            accessibilityLabel="Enable push notifications"
            value={enabled}
            onValueChange={handleChange}
            disabled={pending}
          />
          {error ? <Text accessibilityRole="alert">{error}</Text> : null}
        </View>
      );
    }

![A diagram outlining the four steps to keep a switch state in sync in software development.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/1063494a-dba0-4b32-8eb3-cd56508e14cf/switch-in-react-native-state-sync.jpg)

Reading storage during screen loading means the editable switch's first render can use the loaded preference. An effect can't asynchronously fetch data before that same component's first render, so put that loading boundary in the parent.

Keep one owner for the preference. If your parent or shared store already owns it, put this update-and-save logic there instead of adding an independent child copy; this [app state management guide](https://capgo.app/blog/app-state-management) helps frame that ownership decision.

Test under a slow connection: toggle, let the pending save finish, then toggle again. Confirm the server ends on the last accepted choice; taps made while disabled should not create another write.

<a id="styling-track-and-thumb-colors-on-each-platform"></a>
## Styling Track and Thumb Colors on Each Platform

| Setting | iOS | Android | Note |
|---|---|---|---|
| Default appearance | Native `UISwitch` track and knob | Native Android switch, commonly Material-styled | Keep defaults for system-like settings |
| `trackColor` | Track color for `false` and `true` | Track color for `false` and `true` | Covers most brand colors |
| `thumbColor` | Knob color | Knob color | Verify on each OS version |
| `ios_backgroundColor` | Background exposed around the off track | Not used | iOS only |
| `transform` scale | Shrinks the visual | Shrinks the visual | Layout footprint isn't resized by the transform |

**Identical props don't produce identical controls.** iOS retains its native switch geometry, while Android uses its platform implementation and theme. Don't assume that an Android switch will exactly match a particular Material design mockup across your supported environments.

`trackColor` is the sensible starting point for branding. Supply both Boolean keys so your off state is intentional instead of an accidental platform fallback.

    <Switch
      value={enabled}
      onValueChange={setEnabled}
      trackColor={{
        false: '#64748b',
        true: '#047857',
      }}
      ios_backgroundColor="#64748b"
    />

On iOS, the off track contracts and exposes a surrounding background. That's why setting only `trackColor.false` can leave an unexpected patch: **`ios_backgroundColor` addresses that exposed background**, not a separate Android styling layer.

Setting `thumbColor` also has a trade-off on iOS: the knob loses its native drop shadow. Leave it unset unless a custom knob color is important enough to justify changing the native appearance.

<a id="resize-the-visual-without-squeezing-the-row"></a>
### Resize the visual without squeezing the row

If a design calls for a smaller switch, apply a transform inside a wrapper. For example, this deliberately shrinks the visual while preserving room around it:

    <View style={{ alignItems: 'flex-start' }}>
      <Switch
        style={{ transform: [{ scale: 0.85 }] }}
        value={enabled}
        onValueChange={setEnabled}
      />
    </View>

A transform doesn't resize the layout footprint, but that isn't a guarantee that every transformed native hit region behaves identically. Preserve a generous row-sized interaction area, and verify actual taps rather than judging usability from the visible knob alone.

> Keep native defaults for settings that should feel like part of the operating system. Restyle only when the brand requirement outweighs the extra platform testing.

A gradient behind a settings panel is separate from the native track. Use a surrounding background component, as in this [React Native linear gradient guide](https://capgo.app/blog/linear-gradient-react-native), rather than expecting `trackColor` to accept a gradient.

Before approving the styling, check:

- **Off-state separation:** The track should remain distinguishable from the screen background.
- **Dark-mode tokens:** Inspect both states on iOS and Android, not just the enabled color in a light-theme mockup.

<a id="making-the-switch-usable-with-screen-readers"></a>
## Making the Switch Usable with Screen Readers

An unlabeled switch can expose its role and state without explaining what it changes. A person navigating a settings list may hear an on/off announcement but lack the context to distinguish notification preferences from location or marketing settings.

With a meaningful label, the same control communicates an outcome and its current state. Exact announcement wording differs between **VoiceOver on iOS** and **TalkBack on Android**, so test meaning rather than expecting an identical spoken sentence.

![A woman holding a smartphone and interacting with a list of toggle switches on the screen.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/39a4f469-4c8a-4058-bdc3-dc158c45c503/switch-in-react-native-mobile-ui.jpg)

    <Switch
      value={enabled}
      onValueChange={setEnabled}
      disabled={pending}
      accessibilityRole="switch"
      accessibilityLabel="Enable push notifications"
      accessibilityState={{
        checked: enabled,
        disabled: pending,
      }}
    />

**Use the same Boolean for `value` and `checked`.** If you derive the visual position from local state but the accessible state from an older server response, users can receive contradictory information during a save.

The [React Native accessibility documentation](https://reactnative.dev/docs/accessibility) describes platform-specific accessibility behavior and the switch role; React Native **0.71** also introduced ARIA-style aliases for labels, roles, and checked state. Older projects should use the native accessibility props shown above, and newer projects should choose a consistent convention rather than maintaining competing aliases.

<a id="make-the-row-easier-to-operate"></a>
### Make the row easier to operate

A larger tappable row helps people who struggle to target the knob. However, wrapping a native switch in a `Pressable` without deciding which element owns interaction can create duplicate focus stops or conflicting press behavior.

Choose one accessible target per setting. If the row owns accessibility, give the row the switch role, label, checked state, and disabled behavior, and prevent the decorative inner switch from becoming another independently actionable target.

- **Name the outcome:** Use a specific label such as `Enable push notifications`, not `Toggle setting`.
- **Preserve context:** Keep explanatory text available when a preference has consequences that its label can't convey.
- **Test non-touch input:** Check focus and activation with the hardware keyboard and assistive input methods your application supports.

> **Accessibility check:** A user should be able to identify and change the preference without seeing its color or knob position.

Accessible controls are part of [mobile app user experience](https://capgo.app/blog/app-user-experience), not a separate finishing pass. Turn on VoiceOver and TalkBack, move through the settings screen, and confirm that each switch announces its purpose, current state, and disabled status when applicable.

<a id="connecting-switches-to-forms-and-global-state"></a>
## Connecting Switches to Forms and Global State

**Local `useState`** is the simplest choice for a screen-specific toggle that no other component needs to read. Keep it local when it controls something like whether an optional preview is visible, rather than moving it into a global store just because it's a setting.

**React Hook Form** fits a switch that belongs to a larger editable form with submit, reset, dirty-state tracking, or validation. Use `Controller` to connect the native component through `value` and `onValueChange`; a web-style input registration spread won't provide that mapping.

**Redux or Zustand** fits preferences that several screens consume, such as an application-wide theme choice. Select the relevant Boolean rather than subscribing every settings row to the entire preferences object.

<a id="where-the-switch-value-should-live"></a>
### Where the switch value should live

| Pattern | Best for | Watch out for |
|---|---|---|
| Local `useState` | One screen with no other readers | Stale copies when a parent also stores the value |
| React Hook Form with `Controller` | Switch as one field in a form | Native switch needs an adapter such as `Controller` |
| Redux or Zustand store | Preference read on several screens | Use selectors so unrelated switches don't re-render |

Here's the form-library adapter in a small, complete component:

    import { Controller, useForm } from 'react-hook-form';
    import { Button, Switch, View } from 'react-native';

    export function PreferencesForm({ onSubmit }) {
      const { control, handleSubmit } = useForm({
        defaultValues: {
          pushNotifications: false,
        },
      });

      return (
        <View>
          <Controller
            control={control}
            name="pushNotifications"
            render={({ field: { value, onChange, onBlur } }) => (
              <Switch
                accessibilityLabel="Enable push notifications"
                value={value}
                onValueChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Button
            title="Save preferences"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      );
    }

In this pattern, toggling changes the **form draft**, and the button submits it. Don't also save automatically from the switch callback unless you intentionally want autosave behavior; mixing draft edits with immediate persistence makes cancellation confusing.

The same distinction matters when a screen combines switches with text fields. This [React Native TextInput guide](https://capgo.app/blog/textinput-react-native) is useful when wiring those fields into the same form lifecycle.

<a id="keep-settings-lists-selective"></a>
### Keep settings lists selective

For longer lists, pass an item identifier to a stable update function and use `useCallback` where callback identity affects memoized rows. Pair that with `React.memo`, stable item props, and narrow store selectors; `useCallback` alone doesn't guarantee that only the changed row renders.

Give the value to the **lowest level that can own it**. Move it upward when another consumer needs it, not before.

<a id="pre-release-checklist-for-both-platforms"></a>
## Pre-Release Checklist for Both Platforms

A toggle that behaves correctly during a quick development session can still fail after a restart, rejected save, or account reload. Run these checks against a production-like build with the same persistence path you intend to ship.

- **Restart from a killed app:** Save a preference, remove the app from the task switcher, and reopen it. Confirm the screen loads the saved preference rather than resetting to a component initializer or displaying an editable placeholder while storage loads.
- **Delay the save response:** Throttle the connection or hold the API response in a test environment. Confirm the switch remains disabled during the request and becomes available again after completion, including when the response is an error.
- **Force a rejected write:** Make the persistence function reject and verify that the previous position returns with a visible inline explanation. Test a subsequent successful attempt so an old error doesn't remain on screen after recovery.
- **Inspect off-track contrast:** Check the actual settings background in light and dark mode on both platforms. Include any branded panel backgrounds, because a track that reads clearly on a plain screen can disappear inside a tinted card.
- **Use physical phones:** Run the screen on a physical iPhone and Android phone. Verify touch response, scrolling near the control, and rendering rather than approving the component from simulator screenshots alone.

<a id="fix-behavior-before-polish"></a>
### Fix behavior before polish

If a state check fails, fix the update or persistence path before adjusting colors. A correctly styled knob still misleads the user when the saved preference says something else.

Automate the controllable cases using [React Native Testing Library](https://capgo.app/blog/react-native-testing-library): supply a pending promise, resolve it, reject it, and assert the resulting state and error message. Keep physical-device testing for native interaction and visual behavior that component tests can't establish.

Today, open the settings screen on both devices, toggle every switch twice, and record which controls fail this checklist.

---

Capgo provides live updates, cloud native builds, and release monitoring for Capacitor and Ionic apps, rather than a React Native Switch library. If you also maintain a Capacitor app with preference screens like these, visit [Capgo](https://capgo.app) to explore delivering eligible web-layer fixes while keeping native changes in the normal app-store release flow.
