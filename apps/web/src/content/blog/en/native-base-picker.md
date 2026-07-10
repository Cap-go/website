---
slug: native-base-picker
title: 'Native Base Picker: Setup, Styling & Android Fix'
description: 'Implement Native Base Picker in React Native. Covers setup, state, styling, and a critical fix for the onValueChange bug on Android. Quick guide.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-07-10T08:09:38.047Z
updated_at: 2026-07-10T08:09:39.215Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/dc1b027f-f23a-4977-83c8-e2b173de4cd7/native-base-picker-tutorial-title.jpg'
head_image_alt: 'Native Base Picker: Setup, Styling & Android Fix'
keywords: 'native base picker, react native, nativebase, capacitorjs, mobile UI'
tag: 'Mobile, Capacitor, Android'
published: true
locale: en
next_blog: ''
---
You've probably hit the same wall many React Native teams hit with the NativeBase Picker. The dropdown renders, it looks fine, iOS behaves, and then Android ignores your `onValueChange` logic. No crash. No warning. Just a picker that appears functional while your business logic never runs.

That gap is why the NativeBase Picker still catches experienced developers off guard. The setup is simple, the styling is manageable, but production reliability depends on understanding one Android-specific failure that most guides either gloss over or never mention.

## Table of Contents
- [Getting Started with the NativeBase Picker](#getting-started-with-the-nativebase-picker)
  - [Install the component in a normal React Native setup](#install-the-component-in-a-normal-react-native-setup)
  - [Render a first picker without extra abstraction](#render-a-first-picker-without-extra-abstraction)
- [Binding State and Handling Selections](#binding-state-and-handling-selections)
  - [Use a controlled value from the start](#use-a-controlled-value-from-the-start)
  - [Keep selection logic small and testable](#keep-selection-logic-small-and-testable)
- [Troubleshooting the Android onValueChange Bug](#troubleshooting-the-android-onvaluechange-bug)
  - [What actually breaks on Android](#what-actually-breaks-on-android)
  - [A workaround that holds up in production](#a-workaround-that-holds-up-in-production)
  - [When migrating to Select is the cleaner decision](#when-migrating-to-select-is-the-cleaner-decision)
- [Styling and Theming Your Picker Component](#styling-and-theming-your-picker-component)
  - [Style the wrapper before styling the picker](#style-the-wrapper-before-styling-the-picker)
  - [Use platform-aware presentation](#use-platform-aware-presentation)
- [Advanced Scenarios and Best Practices](#advanced-scenarios-and-best-practices)
  - [Load picker options from server data safely](#load-picker-options-from-server-data-safely)
  - [Prevent placeholder selection on iOS](#prevent-placeholder-selection-on-ios)
  - [Accessibility and production habits](#accessibility-and-production-habits)
- [Conclusion](#conclusion)

<a id="getting-started-with-the-nativebase-picker"></a>
## Getting Started with the NativeBase Picker

A picker is usually one of those components you add late in a sprint. Country selector, status field, appointment type, shipping option. It feels small until platform behavior starts leaking into your UI.

The good news is that the **NativeBase Picker** is easy to get on screen. It was built to render a native picker on iOS and Android and to replace the deprecated React Native Picker in older NativeBase setups, which is why many legacy codebases still rely on it.

![A developer workspace featuring a laptop displaying React Native code next to a mobile app interface.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/a2f53e1b-c584-4098-8b1f-c8bccbe66693/native-base-picker-react-native-code.jpg)

<a id="install-the-component-in-a-normal-react-native-setup"></a>
### Install the component in a normal React Native setup

If your project already uses NativeBase, the main task is importing the right primitives and avoiding unnecessary wrapper logic on day one. Start with the simplest visible picker possible.

If you're working across mobile and hybrid stacks, it also helps to understand how React code gets packaged in broader environments like [React mobile app workflows with Capacitor](https://capgo.app/blog/create-react-mobile-apps-with-capacitor/). The picker code stays familiar, but deployment expectations change.

A basic example looks like this:

```jsx
import React, { useState } from 'react';
import { Container, Content, Form, Item, Picker, Icon } from 'native-base';

export default function BasicPickerScreen() {
  const [selectedValue, setSelectedValue] = useState('key0');

  return (
    <Container>
      <Content padder>
        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={selectedValue}
              onValueChange={(value) => setSelectedValue(value)}
            >
              <Picker.Item label="Choose one" value="key0" />
              <Picker.Item label="JavaScript" value="js" />
              <Picker.Item label="TypeScript" value="ts" />
              <Picker.Item label="React Native" value="rn" />
            </Picker>
          </Item>
        </Form>
      </Content>
    </Container>
  );
}
```

<a id="render-a-first-picker-without-extra-abstraction"></a>
### Render a first picker without extra abstraction

This first pass should answer only two questions:

- **Does it render correctly:** You want to verify the field appears inside your layout, respects spacing, and opens on both platforms.
- **Is your import path correct:** NativeBase projects often fail for boring reasons such as mixing old and new component APIs.
- **Is the selected value controlled:** Even in a throwaway prototype, use `selectedValue` from state. Uncontrolled picker code becomes harder to debug later.

> **Practical rule:** Don't start by mapping server data, placeholder rules, analytics hooks, and validation into the same picker. First make the component visible and controlled.

That stripped-down baseline matters. When Android starts misbehaving later, you'll know the problem isn't your entire form architecture. It's the picker.

<a id="binding-state-and-handling-selections"></a>
## Binding State and Handling Selections

Once the picker renders, the next job is making it useful. In React Native, that means treating it like a controlled input and keeping the selected value in component state.

The standard path is straightforward. You store the current value with `useState`, pass it into `selectedValue`, and update that state inside `onValueChange`. This is the same mindset you'd use for other form fields such as [React Native TextInput patterns](https://capgo.app/blog/textinput-react-native/), even though the UI control is different.

<a id="use-a-controlled-value-from-the-start"></a>
### Use a controlled value from the start

Here's the clean version I'd reach for before adding validation or side effects:

```jsx
import React, { useState } from 'react';
import { Text } from 'react-native';
import { Form, Item, Picker } from 'native-base';

export default function RolePicker() {
  const [role, setRole] = useState('');

  return (
    <>
      <Form>
        <Item picker>
          <Picker
            mode="dropdown"
            selectedValue={role}
            onValueChange={(value) => setRole(value)}
          >
            <Picker.Item label="Select a role" value="" />
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="Editor" value="editor" />
            <Picker.Item label="Viewer" value="viewer" />
          </Picker>
        </Item>
      </Form>

      <Text>Selected role: {role || 'none'}</Text>
    </>
  );
}
```

That code gives you a predictable source of truth. The UI reflects `role`, and every downstream function reads from the same state.

<a id="keep-selection-logic-small-and-testable"></a>
### Keep selection logic small and testable

Problems usually start when developers overload `onValueChange`. They fetch data, mutate several state slices, trigger navigation, and log analytics in one inline function. When picker behavior fails, debugging becomes painful.

A better pattern is to separate value storage from side effects:

```jsx
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Form, Item, Picker } from 'native-base';

export default function DepartmentPicker() {
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('No department selected');

  useEffect(() => {
    if (!department) {
      setMessage('No department selected');
      return;
    }

    setMessage(`Department selected: ${department}`);
  }, [department]);

  return (
    <>
      <Form>
        <Item picker>
          <Picker
            selectedValue={department}
            onValueChange={setDepartment}
          >
            <Picker.Item label="Select department" value="" />
            <Picker.Item label="Sales" value="sales" />
            <Picker.Item label="Support" value="support" />
            <Picker.Item label="Operations" value="operations" />
          </Picker>
        </Item>
      </Form>

      <Text>{message}</Text>
    </>
  );
}
```

This structure does two useful things:

1. It makes the picker responsible only for updating selection state.
2. It moves app behavior into `useEffect`, where you can test and reason about it independently.

> If a form component can't reliably tell your app what the selected value is, every side effect attached to it becomes suspect.

That point becomes critical on Android, where the NativeBase Picker's intended event flow doesn't always hold.

<a id="troubleshooting-the-android-onvaluechange-bug"></a>
## Troubleshooting the Android onValueChange Bug

This is the part most articles skip. The NativeBase Picker can look healthy on Android while failing at the exact moment you need it to do work.

Community documentation around the older picker implementation describes a real cross-platform split. **Android does not trigger custom functions attached to `onValueChange`, while iOS does**, and that failure is described as a **100% functional disparity on Android with a 0% success rate for function triggering on Android devices despite identical code implementation** in the documented reports. The same documentation points developers toward workarounds or migration, and notes that the NativeBase 3.0 `Select` component reaches **98% function triggering success across both platforms in tested environments** in comparison, as described in the [NativeBase picker documentation and migration context](https://github.com/GeekyAnts/native-base-docs/blob/master/docs/components/picker/Picker.md).

![An infographic detailing a common bug in the NativeBase Picker component on Android and its proposed solution.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/499891be-70bf-44bb-8c0b-866d3869a2e0/native-base-picker-bug-fix.jpg)

<a id="what-actually-breaks-on-android"></a>
### What actually breaks on Android

The practical reason is implementation detail. On Android, the NativeBase Picker relies on the native spinner, and that layer doesn't propagate event listeners to the wrapper the way many developers expect. On iOS, the modal-based behavior binds into the event system correctly.

That's why this bug feels deceptive. You see the UI. You can open the options. You can even select a visible item. But your business function never runs.

A typical failing pattern looks like this:

```jsx
<Picker
  selectedValue={status}
  onValueChange={(value) => {
    setStatus(value);
    saveStatusToApi(value);
    trackSelection(value);
    updateDependentFields(value);
  }}
>
```

On iOS, this may behave exactly as intended. On Android, the picker can render while those functions never fire.

<a id="a-workaround-that-holds-up-in-production"></a>
### A workaround that holds up in production

The most reliable workaround is architectural, not cosmetic. Keep picker interaction focused on storing a selected value, then react to state changes outside the picker handler.

```jsx
import React, { useEffect, useState } from 'react';
import { Form, Item, Picker } from 'native-base';

export default function StatusPicker() {
  const [status, setStatus] = useState('');
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
      return;
    }

    if (!status) return;

    runStatusSideEffects(status);
  }, [status, didMount]);

  const runStatusSideEffects = (value) => {
    console.log('Selected status:', value);
    // call validation, API sync, or dependent form updates here
  };

  return (
    <Form>
      <Item picker>
        <Picker
          selectedValue={status}
          onValueChange={setStatus}
        >
          <Picker.Item label="Select status" value="" />
          <Picker.Item label="Pending" value="pending" />
          <Picker.Item label="Approved" value="approved" />
          <Picker.Item label="Rejected" value="rejected" />
        </Picker>
      </Item>
    </Form>
  );
}
```

Why this helps:

- **State stays central:** Your component logic watches `status`, not the picker event payload alone.
- **Side effects become explicit:** API calls, dependent field updates, and tracking no longer live inside a fragile UI callback.
- **The code is easier to replace later:** If you migrate away from NativeBase Picker, most business logic survives untouched.

For Android-heavy projects, I also recommend testing on a real device early, especially if your app already has native packaging complexity such as [Android setup for Capacitor apps](https://capgo.app/blog/android-setup-for-capacitor-apps/).

<a id="when-migrating-to-select-is-the-cleaner-decision"></a>
### When migrating to Select is the cleaner decision

If the picker sits in a critical workflow such as checkout, onboarding, or regulated data entry, patching around old behavior may not be worth it. At that point, moving to NativeBase 3.0 `Select` is usually the safer long-term call.

> The bug isn't just an inconvenience. It changes where you can safely place business logic.

If you keep the old picker, treat it as a UI shell with minimal responsibility. That mindset prevents a lot of silent Android regressions.

<a id="styling-and-theming-your-picker-component"></a>
## Styling and Theming Your Picker Component

A working picker still looks unfinished if it doesn't match the rest of the app. NativeBase gives you enough hooks to make the control feel deliberate, but the cleanest results usually come from styling the container around the picker instead of fighting the native control directly.

![A hand holding a smartphone displaying a travel booking app with a native base picker dropdown menu.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/0b542f51-861c-4510-8a93-2c6ff980f85d/native-base-picker-mobile-app.jpg)

<a id="style-the-wrapper-before-styling-the-picker"></a>
### Style the wrapper before styling the picker

The picker itself is partly constrained by native rendering. The wrapper gives you far more control over spacing, border treatment, and layout rhythm.

A practical pattern:

```jsx
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Form, Item, Picker, Icon } from 'native-base';

export default function StyledPicker() {
  const [country, setCountry] = useState('');

  return (
    <Form>
      <Item style={styles.pickerWrapper} picker>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" style={styles.icon} />}
          textStyle={styles.pickerText}
          selectedValue={country}
          onValueChange={setCountry}
        >
          <Picker.Item label="Select country" value="" />
          <Picker.Item label="Germany" value="de" />
          <Picker.Item label="Japan" value="jp" />
          <Picker.Item label="Brazil" value="br" />
        </Picker>
      </Item>
    </Form>
  );
}

const styles = StyleSheet.create({
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginTop: 12,
    paddingLeft: 8,
    backgroundColor: '#FFFFFF',
  },
  pickerText: {
    color: '#111827',
    fontSize: 16,
  },
  icon: {
    color: '#111827',
    fontSize: 18,
  },
});
```

That approach usually gets you most of the way there without over-engineering theme overrides.

<a id="use-platform-aware-presentation"></a>
### Use platform-aware presentation

iOS and Android rarely need identical styling. They need consistent intent. The same visual token can still require different padding, icon placement, or picker mode.

Useful adjustments include:

- **On iOS:** Give the field breathing room and pay attention to how the modal presentation relates to surrounding labels.
- **On Android:** Check text clipping and default spinner height on multiple devices.
- **For both:** Keep placeholder text visually distinct from real selections.

A short comparison helps:

| Concern | iOS | Android |
|---|---|---|
| Open behavior | Modal feel | Spinner feel |
| Icon expectations | Often more decorative | Often more functional |
| Spacing issues | Placeholder layout can feel loose | Text can feel cramped |

If your UI includes gradients, layered cards, or high-contrast surfaces, align the picker wrapper with the same treatment you use elsewhere in the interface, much like the patterns used in [React Native linear gradient UI work](https://capgo.app/blog/linear-gradient-react-native/).

> **Design note:** Users judge a picker less by the dropdown itself and more by how the closed field sits inside the form.

That's why border radius, label spacing, and placeholder color matter more than exotic picker customization.

<a id="advanced-scenarios-and-best-practices"></a>
## Advanced Scenarios and Best Practices

Most picker bugs show up after the component leaves the prototype phase. The trouble starts when options come from a server, validation rules differ by platform, and the placeholder can't act like a valid value.

One recurring edge case is especially annoying on iOS. Developers often need to load picker values from a server while preventing the placeholder entry from being selectable, yet official material often doesn't address that path directly. Community discussion highlights that **the placeholder value can remain selectable on iOS**, which leads to inconsistent behavior in real apps, as noted in this [React Native community discussion about server-loaded picker values and placeholder selection](https://www.facebook.com/groups/react.native.community/posts/974073242728254/).

![A diagram illustrating the four-step data flow process for using a dynamic picker in NativeBase.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/9a82d3fe-9e84-431c-a33e-460f9fb45b2d/native-base-picker-data-flow.jpg)

<a id="load-picker-options-from-server-data-safely"></a>
### Load picker options from server data safely

The mistake I see most often is treating fetched data as immediately picker-ready. Keep a small transformation layer between your API response and the component.

```jsx
import React, { useEffect, useState } from 'react';
import { Form, Item, Picker } from 'native-base';

export default function DynamicCategoryPicker() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch('https://example.com/api/categories');
      const data = await response.json();

      const formatted = data.map((item) => ({
        label: item.name,
        value: String(item.id),
      }));

      setCategories(formatted);
    };

    loadCategories();
  }, []);

  return (
    <Form>
      <Item picker>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <Picker.Item label="Select category" value="" />
          {categories.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </Item>
    </Form>
  );
}
```

That formatting step gives you a stable contract. Your picker doesn't need to know the API's internal shape.

<a id="prevent-placeholder-selection-on-ios"></a>
### Prevent placeholder selection on iOS

The safest rule is simple. Don't treat the placeholder as a real option, even if the UI library makes it easy to render one.

A practical pattern:

- **Use an empty sentinel value:** Keep the placeholder value as `''` or another invalid application value.
- **Validate before submit:** Reject the empty value in form validation, not just in the UI.
- **Disable downstream actions:** Don't enable the submit button until a non-placeholder value exists.

For stricter flows, render helper text when the placeholder remains selected:

```jsx
const isValidSelection = selectedCategory !== '';
```

Then gate your action buttons or API calls off that condition instead of trusting picker presentation.

<a id="accessibility-and-production-habits"></a>
### Accessibility and production habits

Pickers often slip through accessibility reviews because they're native-looking. They still need clear labeling and predictable state.

A few habits pay off quickly:

- **Add accessibility labels:** Make the field understandable to screen readers.
- **Keep labels explicit:** “Country” is better than “Select”.
- **Test state restoration:** Re-open a form and confirm the previously selected item still appears correctly.
- **Write unit tests around selection-driven logic:** The logic outside the UI matters most, and [unit testing React behavior](https://capgo.app/blog/unit-testing-react/) helps you protect those state transitions.

> A picker is rarely business-critical by itself. The state changes behind it usually are.

That's the mindset that keeps dynamic forms stable. Treat the NativeBase Picker as an input surface. Put the actual rules in your state, validation, and submission flow.

<a id="conclusion"></a>
## Conclusion

The NativeBase Picker is still useful when you understand where it breaks. Setup is straightforward, styling is workable, and server-driven option lists are manageable. A critical trap is Android event handling. If you keep business logic out of fragile picker callbacks and move it into state-driven effects, the component becomes much more predictable.

For older codebases, that workaround is often enough. For critical flows, migrating to `Select` is usually the better investment. Either way, the key is the same. Don't trust the picker just because it renders.

---

If your team ships Capacitor or Electron apps and wants to push JavaScript, CSS, copy, config, and asset fixes without waiting for store review, [Capgo](https://capgo.app) is worth a look. It gives you signed live updates, rollout control, rollback protection, and release visibility so you can recover faster when UI bugs like picker regressions escape into production.
